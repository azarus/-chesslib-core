import { Piece } from "./Piece";
import { Chessboard } from "./Chessboard";

export class Square
{
	piece = null;
	board = null;
	x = -1;
	y = -1;
	constructor(board, x, y)
	{
		this.board = board;
		this.x = x;
		this.y = y;
	}

	setPiece(piece)
	{
		this.piece = piece;
	}

	getPiece()
	{
		return this.piece;
	}
	
	getSibling(offsetX, offsetY)
	{
		return this.board.getSquare(this.x + offsetX, this.y + offsetY);
	}

	getColor()
	{
		var xor = function(a, b) { return !a != !b; };
		return xor(this.x % 2, this.y % 2) ? 'w' : 'b';
	}

	getPosition()
	{
        return {
			x: this.x,
			y: this.y
		}
	}

	getFENPosition()
	{
		return this.board.PositionToFEN(this.x, this.y);
	}

}