import { Piece } from "../Piece";

export class KnightPiece extends Piece
{
	name = "Knight";
	type = "N";
	
	static MovementVectors = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];

	getMoves()
	{
		return this.getMovesByVectors(KnightPiece.MovementVectors, 1);
    }
};