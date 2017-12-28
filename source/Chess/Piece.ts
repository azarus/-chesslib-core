
// Define Movement Vectors
export class MovementVectors
{
	static Diagonal = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
	static Lateral = [[0, 1], [0, -1], [1, 0], [-1, 0]];
	static Omni = MovementVectors.Diagonal.concat(MovementVectors.Lateral);
};


export class COLORS 
{
	static BLACK = 0;
	static WHITE = 1;
	static GREEN = 2;
	static ORANGE = 3;

	static getColor(color)
	{
		return COLORMAP[color];
	}

	static getName(color)
	{
		var keys = Object.keys(COLORMAP);
		for(var key of keys)
		{
			if(COLORMAP[key] == color)
				return key;
		}
		return "";
	}
};

const COLORMAP = {
	w: COLORS.WHITE,
	b: COLORS.BLACK,
	g: COLORS.GREEN,
	o: COLORS.ORANGE
};

// Simploe Piece inmplementation
export class Piece
{
	// Board & Square 
	board = null;
	square = null;

	// Piece description
	name = "Piece";
	color = null;
	type = null;

	// Movement information
	moves = 0;

	index = null;
	
	pieceTimer = null;

	moveDelay = 5000;
	lastMoved = 0;

	constructor(board, square)
	{
		this.board = board;
		this.setSquare(square);
	}

	initialize()
	{
		// Not implemented
	}

	setSquare(square)
	{
		if(this.square)
		{
			this.square.piece = null;
		}

		if(square)
		{
			square.piece = this;
		}

		this.square = square;
	}

	setColor(color)
	{
		this.color = color;
	}

	getColor()
	{
		return this.color;
	}

	// Moves piece to a new square
	move(square)
	{
		if(!square)
			return false;
	

		// If square has piece capture it.
		this.capture(square);

		this.addHistory({
			move: {
				from: this.square,
				to: square,
			},
			lastMoved: this.lastMoved
		});

		// Change positions
		this.moves++;

		// Clear previous square
		this.square.setPiece(null);

		// set new position
		this.setSquare(square);
		this.lastMoved = Date.now();
		return true;
	}

	undo(event)
	{
		if(event.move)
		{
			this.square.setPiece(null);
			this.setSquare(event.move.from);
			this.lastMoved = event.lastMoved;
			this.moves--;
		}

		if(event.captured)
		{
			event.square.setPiece(event.captured);
		}
	}
	
	capture(square)
	{
		if(!square)
			return;
	
		if(square.piece)
		{
			// Add capture to the history
			this.addHistory({
				captured: square.piece,
				square: square,
			});
		}
			
		square.setPiece(null);

	}

	getAllowedMoves()
	{
		if(this.lastMoved > Date.now() - this.moveDelay)
			return [];
		return this.getLegalMoves();
	}

	getLegalMoves()
	{
        return this.getMoves().filter((square) => {
			if(square.piece && square.piece.color == this.color)
				return false;

			return true;
		});
	}

	getMoves(): any[]
	{
		throw new Error("Not implemented");
	}

	getMovesByVectors(vectors, limit=undefined)
	{
		var moves = [], steps, vector, square;

		for(var i = 0, l = vectors.length; i < l; i++)
		{
			steps = 0;
			vector = vectors[i];
			square = this.square;

			// Add all squares in path
			while (square = square.getSibling(vector[0], vector[1]))
			{
				if (square.getPiece())
				{
					// Square is occupied by opponent
					if (square.getPiece().color != this.color)
					{
						// Occupied by other player - piece can be captured
						moves.push(square);
					}
					break;
				}

				moves.push(square);
				steps++;

				// Check if steps limit exceeded
				if (limit && steps >= limit)
					break;
			}
		}
		return moves;
	}
    
    getSymbol()
	{
		return COLORS.getName(this.color) + this.type;
	}

	BeforePieceMoved(piece, square)
	{
		// Not implemented
	}

	AfterPieceMoved(piece, square)
	{
		// Not implemented
	}

	addHistory(data)
	{
		this.board.addHistory(this, data);
	}
};