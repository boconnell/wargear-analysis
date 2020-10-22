"use strict";
exports.__esModule = true;
var R = require("ramda");
var board_data_1 = require("./board_data");
var Combinatorics = require("js-combinatorics");
var continentCombinations = Combinatorics.combination(board_data_1.continents, Math.ceil(R.length(board_data_1.continents) / 4)).toArray();
var mergedContinents = R.map(R.reduce(function (cont1, cont2) { return ({
    members: R.concat(cont1.members, cont2.members),
    name: R.join(", ")([cont1.name, cont2.name]),
    bonus: cont1.bonus + cont2.bonus
}); }, {
    members: [],
    bonus: 0,
    name: ""
}), continentCombinations);
var continentScores = R.map(function (continent) {
    var borderTerritories = R.map(R.pipe(R.prop(R.__, board_data_1.edgesByTerritoryFrom), 
    // @ts-ignore have to upstream the new includes types
    R.reject(R.includes(R.__, continent.members))), continent.members);
    // doesn't infer correctly here because reject doesn't know what type of collection it is getting
    // R.pipe(R.reject(R.isEmpty), R.length)(borderTerritories);
    var numBorderTerritories = R.length(R.reject(R.isEmpty, borderTerritories));
    var totalBorderEdges = R.length(R.flatten(borderTerritories));
    return {
        bonus: continent.bonus,
        name: continent.name,
        members: continent.members,
        numBorderTerritories: numBorderTerritories,
        totalBorderEdges: totalBorderEdges,
        score: continent.bonus / Math.pow(numBorderTerritories, 2)
    };
}, mergedContinents);
var sortedContinentScores = R.sortWith([
    R.descend(R.prop("score")),
    R.ascend(R.prop("totalBorderEdges")),
    R.descend(R.prop("bonus")),
], continentScores);
console.log("Continent scores");
console.log(sortedContinentScores);
