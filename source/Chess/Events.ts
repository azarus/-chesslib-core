import { ChessEventEmitter, ChessEvent } from "./Utils";

export class ChessMoveEvent extends ChessEvent
{
	from = null;
	to = null;
	time = null;

	constructor(from, to, time = 0)
	{
		super();

		this.from = from;
		this.to = to;
		this.time = time;
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