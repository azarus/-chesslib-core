//var fs = require("fs");
//var string = fs.readFileSync("lastgame.json").toString();

import { Chessboard, Positions, COLORS } from "../build/Chess";

// Create an 8x8 square chessboard
let board = new Chessboard(8, 8);

// Load the default positions
board.loadPositions(Positions.default);

// Return moves as strings
var moves = board.getMovesFEN();

// Make all the possible moves (There is no turn check, simply extend the board to implement checkmate & turns for traditional check.)
// This is to allow different chess styles to be implemented.
for(var move of moves)
{
	// Try to make the move
	if(!board.tryMoveFEN(move.from, move.to))
	{
		console.log("Move failed", move);
	}
}

// Check out https://github.com/azarus/ng2-chessboard for an userinterface.


