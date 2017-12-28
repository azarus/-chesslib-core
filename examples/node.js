var Chessboard = require("@chesslib/core").Chessboard;
var Positions = require("@chesslib/core").Positions;
var board = new Chessboard();
board.loadPositions(Positions.default);
console.log("chessboard", board.getBoard());

var moves = board.getMoves();
console.log("Moves:", moves);