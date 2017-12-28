import { Piece, COLORS } from "../Piece";
import { ChessPromoteEvent } from "../Events";

export class PawnPiece extends Piece
{
	name = "Pawn";
	type = "P";

	enpassant = false;

	move(square)
	{
		var current = this.square;
		
		// Set enpassant flag if it was a big move
		if(Math.abs(current.getPosition().y - square.getPosition().y) > 1)
		{
			this.enpassant = true;
		}else{
			this.enpassant = false;
		}

		if(!super.move(square))
			return false;
		

		// Check if the move was enpassant capture
		var back = this.square.getSibling(0, (this.color == COLORS.WHITE ? 1 : -1));
		if(back && back.piece && back.piece.color != this.color && back.piece.enpassant)
		{
			this.capture(back);
		}
		
		// Queening
		var forwardSquare = this.square.getSibling(0, (this.color == COLORS.WHITE ? -1 : 1));
		if(!forwardSquare)
		{
			var newPiece = this.board.createPiece("Q", this.color);
			newPiece.setSquare(this.square);
			newPiece.lastMoved = Date.now();
			this.board.onPromote.emit(new ChessPromoteEvent(this.square, newPiece,  this.board.SquareToFEN(this.square)));
		}

		
		return true;
	}

	onMoved(square)
	{
		this.board.addToHistory("move", {
			lastMoved: this.lastMoved,
			moves: this.moves,
			enpassant: this.enpassant,
			piece: this,
			from: this.square,
			to: square
		});
	}

	undoMove(move)
	{
		this.enpassant = move.enpassant;
		this.lastMoved = move.lastMoved;
		this.moves = move.moves;
		this.setSquare(move.from);
	}

	AfterPieceMoved(piece, square)
	{
		// If any piece is moved no enpassant moves are allowed
		// if(piece.color != this.color)
		// {
		// 	this.enpassant = false;
		// }

		
	}

	getMoves()
	{
		var moves = [];
		var direction = (this.color == COLORS.WHITE ? -1 : 1);
		
		// 1 Forward
		var square1 = this.square.getSibling(0, direction);
		if (square1 && !square1.piece)
		{
			moves.push(square1);
		}

		// 2 Forward (if didn't move yet)
		var square2 = this.square.getSibling(0, direction * 2);
		if (square2 && !square2.piece && this.moves == 0 && !square1.piece) 
		{
			moves.push(square2);
		}

		// Capture 1
		var capture1 = this.square.getSibling(1, direction);
		if (capture1 && capture1.piece && capture1.piece.color != this.color)
		{
			moves.push(capture1);
		}

		// Capture 2
		var capture2 = this.square.getSibling(-1, direction);
		if (capture2 && capture2.piece && capture2.piece.color != this.color)
		{
			moves.push(capture2);
		}
		
		// En passant capture 1
		var enpassant1 = this.square.getSibling(1, 0);
		if(enpassant1 && enpassant1.piece && enpassant1.piece.color != this.color && enpassant1.piece.moves == 1 && enpassant1.piece.enpassant)
		{
			moves.push(this.square.getSibling(1, direction));
		}

		/// En passant capture 2
		var enpassant2 = this.square.getSibling(-1, 0);
		if(enpassant2 && enpassant2.piece && enpassant2.piece.color != this.color && enpassant2.piece.moves == 1 && enpassant2.piece.enpassant)
		{
			moves.push(this.square.getSibling(-1, direction));
		}

		return moves;
	}


};