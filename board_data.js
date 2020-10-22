"use strict";
exports.__esModule = true;
exports.edgesByTerritoryFrom = exports.continents = void 0;
var boardDetails = require("./board.json");
var R = require("ramda");
var utils_1 = require("./utils");
exports.continents = R.map(R.pipe(R.pick(["bonus", "members", "name"]), R.evolve({
    bonus: parseInt,
    members: R.split(",")
})), boardDetails.continents);
var edges = R.map(R.pick(["fromid", "toid"]), boardDetails.borders);
// Breaking this out allows type inference in edgesByTerritoryFrom
var toIdFrom = R.mapObjIndexed(R.map(R.prop("toid")), R.groupBy(R.prop("fromid"), edges));
exports.edgesByTerritoryFrom = utils_1.mergeWith(utils_1.concat, toIdFrom, R.mapObjIndexed(R.map(R.prop("fromid")), R.groupBy(R.prop("toid"), edges)));
