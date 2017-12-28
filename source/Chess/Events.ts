import { ChessEventEmitter, ChessEvent } from "./Utils";

export class ChessMoveEvent extends ChessEvent
{
	from = null;
	to = null;

	constructor(from, to)
	{
		super();

		this.from = from;
		this.to = to;
	}
};

export class ChessPromoteEvent extends ChessEvent
{
	fen = null;
	piece = null;
	square = null;
	
	constructor(square, piece, fen)
	{
		super();

		this.fen = fen;
		this.piece = piece;
		this.square = square;
	}
};