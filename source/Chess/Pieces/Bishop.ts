import { Piece, MovementVectors } from "../Piece";

export class BishopPiece extends Piece
{
	name = "Bishop";
	type = "B";
	
	getMoves()
	{
		return this.getMovesByVectors(MovementVectors.Diagonal);
	}



};