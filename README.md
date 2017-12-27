# @chesslib
Fast &amp; universal chesslibrary with Basic AI support


## Install:
npm install @chesslib/core
https://www.npmjs.com/package/@chesslib/core

## API (Basic)

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
For more please see examples folder

## Chess AI

The AI is a simple implementation of a basic board evaluation. The AI is trying every moves possible confirming the board value is better for a given move. The search depth can be configured, and due to it's high CPU intensivity it is recommended to use it with webworkers in browsers, and run it as a seperate process or thread in nodejs if required.

The example use of the AI is documented under examples/ folder.