import { Piece, MovementVectors } from "../Piece";

export class KingPiece extends Piece
{
	name = "King";
	type = "K";
	

	move(square)
	{
		if(Math.abs(square.getPosition().x - this.square.getPosition().x) > 1)
		{
			// Castle Left rook
			if(square.getPosition().x - this.square.getPosition().x < 0)
			{
				return this.castle(-4, -1, -2);
			}

			// Castle Right rook
			if(square.getPosition().x - this.square.getPosition().x > 0)
			{
				return this.castle(3, 1, 2);
			}
		}

		if(!super.move(square))
			return false;
		
		
		return true;
	}

	getMoves()
	{
		return this.getCastlingMoves([[-1, 0, 4], [1, 0, 3]], 2, 'R');
	}

	getCastlingMoves(vectors, distance, castlingPieceType)
	{
		var moves = this.getMovesByVectors(MovementVectors.Omni, 1);
		
		if(this.moves > 0)
			return moves;

		var steps, vector, square;
		for(var i = 0, l = vectors.length; i < l; i++)
		{
			steps = 0;
			vector = vectors[i];
			square = this.square;

			// Check if the castling piece is available
			var castlingTarget = this.square.getSibling(vector[0] * vector[2], vector[1] * vector[2]);
			if(castlingTarget && castlingTarget.piece && castlingTarget.piece.type == castlingPieceType && castlingTarget.piece.color == this.color && castlingTarget.piece.moves == 0)
			{
				// Add all squares in path
				while (square = square.getSibling(vector[0], vector[1]))
				{
					// Square is occupied
					if (square.getPiece())
					{
						break;
					}

					moves.push(square);
					steps++;

					// Check if steps limit exceeded
					if (distance && steps >= distance)
						break;
				}
			}
		}
		return moves;
	}

	castle(rookPosition, kingPosition, castlePosition)
	{
		var rookSquare = this.square.getSibling(rookPosition, 0);
		var kingSquare = this.square.getSibling(kingPosition, 0);		
		var castlingSquare = this.square.getSibling(castlePosition, 0);

		// this.addHistory({
		// 	castling: {
		// 		rookSquare: rookSquare,
		// 		kingSquare: kingSquare,
		// 		castlingSquare: castlingSquare,
		// 	},
		// 	castling: this.canCastle,
		// });
		//this.setCastling(rookSquare, kingSquare, current, castlingSquare);
		rookSquare.piece.move(kingSquare);
		
		return super.move(castlingSquare);
	}
	
	// setCastling(from, to, castledFrom, castledTo)
	// {
	// 	this.castling = {
	// 		castlingfrom: from,
	// 		castlingTo: to,
	// 		castledPiece: this,
	// 		castledFrom: castledFrom,
	// 		castledTo: castledTo,
	// 	};
	// }
};