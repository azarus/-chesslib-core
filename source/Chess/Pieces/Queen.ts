import { Piece, MovementVectors } from "../Piece";

export class QueenPiece extends Piece
{
	name = "Queen";
	type = "Q";

	getMoves()
	{
		return this.getMovesByVectors(MovementVectors.Omni);
	}
};