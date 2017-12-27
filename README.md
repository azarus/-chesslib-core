# @chesslib/core
Fast &amp; universal chesslibrary with Basic AI support


## Install:
npm install @chesslib/core
https://www.npmjs.com/package/@chesslib/core

## API

```
import { Chessboard, Positions } from "@chesslib/core";

var board = Chessboard.fromPosition(Positions.default);

// Get all possible moves
var moves = board.getFENMoves();
if(board.tryMoveFEN(moves[0].from, moves[0].to))
{
    console.log("Move was valid");
}
```
