import { Chessboard } from "./Chessboard";


export class RTSChessboard extends Chessboard
{
	PIECE_DELAY_CONFIG = {
		P: 4000,
		N: 5000,
		B: 5000,
		R: 5000,
		Q: 4000,
		K: 5000,
	};

	GameSpeed = 1;
	SetSpeed(GameSpeed)
	{
		this.GameSpeed = GameSpeed;
	}

	getMoveTimeForPiece(pieceType)
	{
		return this.PIECE_DELAY_CONFIG[pieceType] / this.GameSpeed;
	}

	getAllowedMovesOf(piece)
	{
		if(piece.lastMoved > Date.now() - this.getMoveTimeForPiece(piece.type))
		{
			return [];
		}
		return super.getAllowedMovesOf(piece);
	}
};