const boardDetails = require("./board.json");
import * as R from "ramda";
import { mergeWith, concat } from "./utils";

export const continents = R.map(
  R.pipe(
    R.pick(["bonus", "members", "name"]),
    R.evolve({
      bonus: parseInt,
      members: R.split(","),
    })
  ),
  boardDetails.continents as PreParsedContinent[]
);

const edges = R.map(
  R.pick(["fromid", "toid"]),
  boardDetails.borders as PreParsedBorder[]
);

// Breaking this out allows type inference in edgesByTerritoryFrom
const toIdFrom = R.mapObjIndexed(
  R.map(R.prop("toid")),
  R.groupBy(R.prop("fromid"), edges)
);

export const edgesByTerritoryFrom = mergeWith(
  concat,
  toIdFrom,
  R.mapObjIndexed(R.map(R.prop("fromid")), R.groupBy(R.prop("toid"), edges))
);
