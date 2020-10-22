import * as R from "ramda";
import { continents, edgesByTerritoryFrom } from "./board_data";
import * as Combinatorics from "js-combinatorics";

const continentCombinations = Combinatorics.combination(
  continents,
  Math.ceil(R.length(continents) / 4)
).toArray();

const mergedContinents = R.map(
  R.reduce(
    (cont1, cont2) => ({
      members: R.concat(cont1.members, cont2.members),
      name: R.join(", ")([cont1.name, cont2.name]),
      bonus: cont1.bonus + cont2.bonus,
    }),
    {
      members: [] as string[],
      bonus: 0,
      name: "",
    }
  ),
  continentCombinations
);

const continentScores = R.map((continent) => {
  const borderTerritories = R.map(
    R.pipe(
      R.prop(R.__, edgesByTerritoryFrom),
      // @ts-ignore have to upstream the new includes types
      R.reject(R.includes(R.__, continent.members))
    ),
    continent.members
  );
  // doesn't infer correctly here because reject doesn't know what type of collection it is getting
  // R.pipe(R.reject(R.isEmpty), R.length)(borderTerritories);
  const numBorderTerritories = R.length(R.reject(R.isEmpty, borderTerritories));
  const totalBorderEdges = R.length(R.flatten(borderTerritories));
  return {
    bonus: continent.bonus,
    name: continent.name,
    members: continent.members,
    numBorderTerritories,
    totalBorderEdges,
    score: continent.bonus / Math.pow(numBorderTerritories, 2),
  };
}, mergedContinents);

const sortedContinentScores = R.sortWith(
  [
    R.descend(R.prop("score")),
    R.ascend(R.prop("totalBorderEdges")),
    R.descend(R.prop("bonus")),
  ],
  continentScores
);

console.log("Continent scores");
console.log(sortedContinentScores);
