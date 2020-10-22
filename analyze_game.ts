const game = require("./game.json");
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { continents } from "./board_data";
import { mergeWith } from "./utils";

const territories = R.map(
  R.pipe(
    R.prop("@attributes"),
    R.pick(["tid", "seat", "unitcount"]),
    RA.renameKeys({ tid: "id" }),
    R.evolve({ unitcount: parseInt })
  ),
  game.board.territory as RawTerritory[]
) as Territory[]; // needed because renameKeys isn't well typed
const territoriesById = R.indexBy(R.prop("id"), territories);

const territoriesPerPlayer = R.groupBy(R.prop("seat"), territories);

const x = R.map(R.prop("unitcount"));
const unitsPerPlayer = R.mapObjIndexed(R.pipe(x, R.sum), territoriesPerPlayer);
const territoryCountPerPlayer = R.mapObjIndexed(R.length, territoriesPerPlayer);

const playerBonuses = R.map((continent) => {
  const members = R.prop("members", continent);
  const seats = R.map(
    R.pipe(R.prop(R.__, territoriesById), R.prop("seat")),
    members
  );
  const player = seats[0];
  const bonus = R.pipe(R.uniq, R.length, R.equals(1))(seats)
    ? R.prop("bonus", continent)
    : undefined;
  return {
    player,
    bonus,
  };
}, continents);

// Typescript doesn't pick up on reject type guard
const nonNilPlayerBonuses = R.reject(
  R.pipe(R.prop("bonus"), R.isNil),
  playerBonuses
) as { bonus: number; player: string }[];
const filteredBonusesByPlayer = R.groupBy(
  R.prop("player"),
  nonNilPlayerBonuses
);
const y = R.map(R.prop("bonus"));
const continentBonusPerPlayer = R.mapObjIndexed(
  R.pipe(y, R.sum),
  filteredBonusesByPlayer
);

const reservesPerPlayer = R.mapObjIndexed(
  (territoryCount, player) =>
    R.defaultTo(0, continentBonusPerPlayer[player]) + Math.floor(territoryCount / 5),
  territoryCountPerPlayer
);

const troopsToConquer = mergeWith(
  R.uncurryN(2, R.compose(R.add, R.multiply(2))),
  unitsPerPlayer,
  territoryCountPerPlayer
);
const actionableTroopsPerPlayer = mergeWith(
  R.uncurryN(2, R.compose(R.add, R.multiply(-1))),
  territoryCountPerPlayer,
  unitsPerPlayer
);

console.log("units per player:");
console.log(unitsPerPlayer);
console.log("territories per player:");
console.log(territoryCountPerPlayer);
console.log("contintent bonus per player:");
console.log(continentBonusPerPlayer);
console.log("reserves per player");
console.log(reservesPerPlayer);
console.log("troops to conquer");
console.log(troopsToConquer);
console.log("actionable troops per player");
console.log(actionableTroopsPerPlayer);
