# What is this
* A script (analyze_board.ts) to analyze a wargear board, to find the best combination of continents to target based on the value:border ratio
* A script (analyze_game.ts) to analyze an in-progress wargear game, to find stats on how much power each player has on the board (e.g. territories, value, units)

## Assumptions (I think, been a while):
* Continents don't overlap
* No special borders?

## Side goals:
As much as possible:
* Use pure functional style (and ramda library where possible)
* Rely on TS type inference (no explicit type casting)

# Setup

## Install dependencies:

```
nvm use
npm install
```


## Compile

```
tsx analyze_board.ts analyze_game.ts types.ts
```

## To analyze board:
On a wargear page, open the dev console, refresh the game, and note the XHR request. It will include the board id

Transform XML result from `http://www.wargear.net/rest/GetBoardData/<board-id>>?player=js` into JSON with no prefixes using an online conversion tool

Place resulting JSON into this directory as board.js

```
node analyze_board.js
```

## To analyze game:

On a wargear page, open the dev console, refresh the game, and note the XHR request

Copy that request's response into game.js in this directory

```
node analyze_game.js
```
