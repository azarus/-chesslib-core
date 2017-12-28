import { Square } from "./Square";
import { Piece, COLORS } from "./Piece";

// Pieces
import { PawnPiece } from "./Pieces/Pawn";
import { BishopPiece } from "./Pieces/Bishop";
import { KnightPiece } from "./Pieces/Knight";
import { RookPiece } from "./Pieces/Rook";
import { QueenPiece } from "./Pieces/Queen";
import { KingPiece } from "./Pieces/King";

// Events
import { ChessMoveEvent, ChessPromoteEvent } from "./Events";

// Third Party
import { ChessEventEmitter, ChessEvent } from "./Utils";
import { Positions } from "./Positions";

export class Chessboard
{
	static SIDE = "abcdefghijklmnopqrstuvwxyz";

	static RANKS = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"];
	static PIECES = {
		P: PawnPiece,
		B: BishopPiece,
		N: KnightPiece,
		R: RookPiece,
		Q: QueenPiece,
		K: KingPiece,
	};

	boardSize = {
		x: 8,
		y: 8,
	};

	history = [];

	squares = new Array();

	onPromote = new ChessEventEmitter();
	
	constructor(sizeX=8, sizeY=8)
	{
		
		this.boardSize.x = sizeX;
		this.boardSize.y = sizeY;
		this.reset();
	}

	static fromPosition(position)
	{
		var sizeY = position.length;
		var sizeX = position[0].length;
		let board = new Chessboard(sizeX, sizeY);
		board.loadPositions(position);
		return board;
	}

	clone()
	{
		return Chessboard.fromPosition(this.savePositions());
	}

	reset()
	{
		this.squares = new Array();
		for(var y=0;y<this.boardSize.y;++y)
		{
			this.squares[y] = new Array();
			for(var x=0;x<this.boardSize.x;++x)
			{
				this.squares[y][x] = new Square(this, x, y);
			}	
		}
		this.history = [];
	}

	forEach(callback)
	{
		for(var y=0;y<this.boardSize.y;++y)
		{
			for(var x=0;x<this.boardSize.x;++x)
			{
				callback(this.squares[y][x], x, y);
			}	
		}
	}

	forEachPiece(callback)
	{
		this.forEach( (square, x, y) => {
			if(square.piece)
			{
				callback(square.piece, x, y, square);
			}
		});
	}

	findPieces(pieceType=null, color=null)
	{
		var pieces = [];
		this.forEachPiece( piece => {
			if(pieceType && piece.type != pieceType)
				return 

			if(color && piece.color != color)
				return;

			pieces.push(piece);
		
		});

		return pieces;
	}

	map(callback)
	{
		let newSquares = new Array();
		for(var y=0;y<this.boardSize.y;++y)
		{
			newSquares[y] = new Array();
			for(var x=0;x<this.boardSize.x;++x)
			{
				newSquares[y][x] = callback(this.squares[y][x], x, y);
			}	
		}
		return newSquares;
	}

	loadPositions(positions)
	{
		this.reset();

		if(positions.length > this.boardSize.y || positions[0].length > this.boardSize.x)
		{
			return false;
		}

		for(var y = 0;y<positions.length;++y)
		{
			for(var x = 0;x<positions[y].length;++x)
			{
				var square = this.getSquare(x, y);
				this.setSquare(square, positions[y][x][1], COLORS.getColor(positions[y][x][0]));
			}
		}
		return true;
	}

	savePositions()
	{
		var positions = [];
		for(var y=0;y<this.boardSize.y;++y)
		{
			positions[y] = [];
			for(var x=0;x<this.boardSize.x;++x)
			{
				if(this.squares[y][x].piece)
				{
					positions[y][x] = COLORS.getName(this.squares[y][x].piece.color) + this.squares[y][x].piece.type;
				}else{
					positions[y][x] = "";
				}
			}
		}

		return positions;
	}

	setBoard(board)
	{
		this.reset();
		var keys = Object.keys(board);
		for(var key of keys)
		{
			var square = this.FENToSquare(key);
			if(!square)
				return;

			var color = board[key][0];
			var piece = board[key][1];
			this.setSquare(square, piece, COLORS.getColor(color));
		}
	}

	getBoard()
	{
		var positions = {};
		this.forEach( square => {
			if(square.piece)
			{
				positions[this.SquareToFEN(square)] = square.piece.getSymbol();
			}
		});
		return positions;
	}
	
	
	getSquare(x, y)
	{
		if(x >= (this.boardSize.x) || x < 0 || y >= (this.boardSize.y) || y < 0)
			return null;
		return this.squares[y][x];
	}

	setSquare(square, type, color)
	{
		if(!square)
			return null;

		if(!type)
			return this.clearSquare(square);
		
		if(!Chessboard.PIECES[type])
			return null;

		return this.createPiece(type, color, square);
	}

	createPiece(type, color, square)
	{
		let newPiece = new Chessboard.PIECES[type](this, square);
		newPiece.setColor(color);
		newPiece.initialize();
		return newPiece;
	}

	setPiece(square, piece)
	{
		if(!square)
			return false;
		
		// Remove the old piece from the square
		if(square.piece)
		{
			square.piece.square = null;
		}

		// Set the new piece
		square.piece = piece;
		if(piece)
		{
			piece.square = square;
		}
		
		return true;
	}

	clearSquare(square)
	{
		if(square.piece)
		{
			square.piece.setSquare(null);
			square.setPiece(null);
		}
	}

	
	isValidMoveFEN(from, to)
	{
		var fromSquare = this.FENToSquare(from);
		var toSquare = this.FENToSquare(to);
		return this.isValidMove(fromSquare, toSquare);
	}

	isValidMove(from, to)
	{
		if(!from || !to)
			return false;
		
		if(!from.piece)
			return false;
		
		return !!this.getAllowedMovesOf(from.piece).find( move=> {
			
			if(from == move.from && to == move.to)
				return true;
			return false;
		});
		
	}

	doMove(move)
	{
		this.move(move.from, move.to);
	}

	doMoveFEN(move)
	{
		this.tryMoveFEN(move.from, move.to)
	}
	
	move(from, to, simulatedMove=false)
	{
		if(!from || !to)
			return false;
		
	
		if(!from.piece)
			return false;
		
		var movingPiece = from.piece;

		// Add the move to the history
		this.history.push([]);
	
		// this.forEachPiece( piece => {
		// 	piece.BeforePieceMoved(movingPiece, to);
		// });
	
		var result = movingPiece.move(to);
		
		// this.forEachPiece( piece => {
		// 	piece.AfterPieceMoved(movingPiece, to);
		// });
		
	

		return result;
	}

	addHistory(piece, data)
	{
		var history = {
			piece: piece,
			data: data,
		};

		this.history[this.history.length-1].push(history);
	}

	// pushHistory(piece, data)
	// {
	// 	var historyEvent = {
	// 		piece: piece,
	// 		type: type,
	// 		data: data,
	// 	};
		
	// 	this.history[this.history.length - 1].push(historyEvent);
	// }

	// popHistory()
	// {
	// 	var history = this.history.pop()
	// 	history.piece.undo(history.data);
	// 	return history;
	// }
	
	// newHistory()
	// {
	// 	this.history.push([]);
	// }

	// Undo the last actions.
	undo()
	{
		var history = this.history.pop();
		if(!history)
		{
			return null;
		}
		var historySize = history.length;
		for(var i=0;i<historySize;++i)
		{
			var event = history.pop();
			event.piece.undo(event.data);
		}
		return history;
	}

	moveFEN(from, to, simulatedMove = false)
	{
		var fromSquare = this.FENToSquare(from);
		var toSquare = this.FENToSquare(to);
		return this.move(fromSquare, toSquare, simulatedMove);
	}

	tryMove(from, to, simulatedMove = false)
	{
		if(!this.isValidMove(from, to))
			return false;
		return this.move(from, to, simulatedMove);
	}

	tryMoveFEN(from, to, simulatedMove = false)
	{
		var fromSquare = this.FENToSquare(from);
		var toSquare = this.FENToSquare(to);
		
		if(!this.isValidMove(fromSquare, toSquare))
		{
			return false;
		}
		return this.move(fromSquare, toSquare, simulatedMove);
	}

	getAllowedMovesOf(piece)
	{
		return piece.getAllowedMoves().map( toSquare => {
			return {
				from: piece.square,
				to: toSquare,
			};
		});
	}

	getMovesOf(piece)
	{
		return piece.getLegalMoves().map( toSquare => {
			return {
				from: piece.square,
				to: toSquare,
			};
		});
	}
	
	getMovesAtFEN(fen)
	{
		var square = this.FENToSquare(fen);
		if(square && square.piece)
		{
			return this.getAllowedMovesOf(square.piece);
		}
		return [];
	}

	getFENMovesatFEN(fen)
	{
		return this.getMovesAtFEN(fen).map( ( move ) => {
			move.from = this.PositionToFEN(move.from.x, move.from.y);
			move.to = this.PositionToFEN(move.to.x, move.to.y);
			return move;
		});
	}
	
	getMoves(color=null)
	{
		let moves = [];
		this.forEachPiece( (piece) => {
			
			if(color !== null && color != piece.color)
			{
				//console.log("not same color?");
				return;
			}
			
			moves.push.apply(moves, this.getAllowedMovesOf(piece));
		});
		return moves;
	}

	getMovesFEN(color=null)
	{
		return this.getMoves(color).map( ( move ) => {
			move.from = this.PositionToFEN(move.from.x, move.from.y);
			move.to = this.PositionToFEN(move.to.x, move.to.y);
			return move;
		});
	}
	
	PositionToFEN(x, y)
	{
		return this.charIndex(x) + (this.boardSize.y - y);
	}

	FENtoPosition(fen)
	{
		return {
			x: this.indexOfChar( fen[0] ),
			y: (this.boardSize.y - fen[1])
		};
	}

	FENToSquare(fen)
	{
		var position = this.FENtoPosition(fen);
		return this.getSquare(position.x, position.y);
	}

	SquareToFEN(square)
	{
		var position = square.getPosition();
		return this.PositionToFEN(position.x, position.y);
	}

	charIndex(index)
	{
		return Chessboard.SIDE[index];
	}

	indexOfChar(char)
	{
		return Chessboard.SIDE.indexOf(char);
	}

	clearDebug()
	{
		this.forEach( square => {
			square.debug = false;
		})
	}

	debugSquare(square, debugColor)
	{
		square.debug = debugColor;
	}

	debugFEN(fen, debugColor)
	{
		var square = this.FENToSquare(fen);
		if(square)
		{
			square.debug = debugColor;
		}
	}

	debugMoves(fen, debugColor)
	{
		var square = this.FENToSquare(fen);
		if(square && square.piece)
		{
			var piece = square.getPiece();
			var moves = piece.getLegalMoves();
			moves.forEach( square => {
				square.debug = debugColor;
			});
			return true;
		}
		
		return false;
	}
};
