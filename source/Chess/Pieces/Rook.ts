import { Piece, MovementVectors } from "../Piece";

export class RookPiece extends Piece
{
	name = "Rook";
	type = "R";

	getMoves()
	{
		return this.getMovesByVectors(MovementVectors.Lateral);
	}

};