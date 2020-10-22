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

Transform XML result from http://www.wargear.net/rest/GetBoardData/<board-id>>?player=js into JS with no prefixes

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