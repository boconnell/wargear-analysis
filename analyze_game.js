"use strict";
exports.__esModule = true;
var game = require("./game.json");
var R = require("ramda");
var RA = require("ramda-adjunct");
var board_data_1 = require("./board_data");
var utils_1 = require("./utils");
var territories = R.map(R.pipe(R.prop("@attributes"), R.pick(["tid", "seat", "unitcount"]), RA.renameKeys({ tid: "id" }), R.evolve({ unitcount: parseInt })), game.board.territory); // needed because renameKeys isn't well typed
var territoriesById = R.indexBy(R.prop("id"), territories);
var territoriesPerPlayer = R.groupBy(R.prop("seat"), territories);
var x = R.map(R.prop("unitcount"));
var unitsPerPlayer = R.mapObjIndexed(R.pipe(x, R.sum), territoriesPerPlayer);
var territoryCountPerPlayer = R.mapObjIndexed(R.length, territoriesPerPlayer);
var playerBonuses = R.map(function (continent) {
    var members = R.prop("members", continent);
    var seats = R.map(R.pipe(R.prop(R.__, territoriesById), R.prop("seat")), members);
    var player = seats[0];
    var bonus = R.pipe(R.uniq, R.length, R.equals(1))(seats)
        ? R.prop("bonus", continent)
        : undefined;
    return {
        player: player,
        bonus: bonus
    };
}, board_data_1.continents);
// Typescript doesn't pick up on reject type guard
var nonNilPlayerBonuses = R.reject(R.pipe(R.prop("bonus"), R.isNil), playerBonuses);
var filteredBonusesByPlayer = R.groupBy(R.prop("player"), nonNilPlayerBonuses);
var y = R.map(R.prop("bonus"));
var continentBonusPerPlayer = R.mapObjIndexed(R.pipe(y, R.sum), filteredBonusesByPlayer);
var reservesPerPlayer = R.mapObjIndexed(function (territoryCount, player) {
    return R.defaultTo(0, continentBonusPerPlayer[player]) + Math.floor(territoryCount / 5);
}, territoryCountPerPlayer);
var troopsToConquer = utils_1.mergeWith(R.uncurryN(2, R.compose(R.add, R.multiply(2))), unitsPerPlayer, territoryCountPerPlayer);
var actionableTroopsPerPlayer = utils_1.mergeWith(R.uncurryN(2, R.compose(R.add, R.multiply(-1))), territoryCountPerPlayer, unitsPerPlayer);
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
