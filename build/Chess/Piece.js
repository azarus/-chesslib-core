"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define Movement Vectors
var MovementVectors = /** @class */ (function () {
    function MovementVectors() {
    }
    MovementVectors.Diagonal = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
    MovementVectors.Lateral = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    MovementVectors.Omni = MovementVectors.Diagonal.concat(MovementVectors.Lateral);
    return MovementVectors;
}());
exports.MovementVectors = MovementVectors;
;
var COLORS = /** @class */ (function () {
    function COLORS() {
    }
    COLORS.getColor = function (color) {
        return COLORMAP[color];
    };
    COLORS.getName = function (color) {
        var keys = Object.keys(COLORMAP);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (COLORMAP[key] == color)
                return key;
        }
        return "";
    };
    COLORS.BLACK = 0;
    COLORS.WHITE = 1;
    COLORS.GREEN = 2;
    COLORS.ORANGE = 3;
    return COLORS;
}());
exports.COLORS = COLORS;
;
var COLORMAP = {
    w: COLORS.WHITE,
    b: COLORS.BLACK,
    g: COLORS.GREEN,
    o: COLORS.ORANGE
};
// Simploe Piece inmplementation
var Piece = /** @class */ (function () {
    function Piece(board, square) {
        // Board & Square 
        this.board = null;
        this.square = null;
        // Piece description
        this.name = "Piece";
        this.color = null;
        this.type = null;
        // Movement information
        this.moves = 0;
        this.index = null;
        this.pieceTimer = null;
        this.moveDelay = 5000;
        this.lastMoved = 0;
        this.board = board;
        this.setSquare(square);
    }
    Piece.prototype.initialize = function () {
        // Not implemented
    };
    Piece.prototype.setSquare = function (square) {
        if (this.square) {
            this.square.piece = null;
        }
        if (square) {
            square.piece = this;
        }
        this.square = square;
    };
    Piece.prototype.setColor = function (color) {
        this.color = color;
    };
    Piece.prototype.getColor = function () {
        return this.color;
    };
    // Moves piece to a new square
    Piece.prototype.move = function (square) {
        if (!square)
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
    };
    Piece.prototype.undo = function (event) {
        if (event.move) {
            this.square.setPiece(null);
            this.setSquare(event.move.from);
            this.lastMoved = event.lastMoved;
            this.moves--;
        }
        if (event.captured) {
            event.square.setPiece(event.captured);
        }
    };
    Piece.prototype.capture = function (square) {
        if (!square)
            return;
        if (square.piece) {
            // Add capture to the history
            this.addHistory({
                captured: square.piece,
                square: square,
            });
        }
        square.setPiece(null);
    };
    Piece.prototype.getAllowedMoves = function () {
        if (this.lastMoved > Date.now() - this.moveDelay)
            return [];
        return this.getLegalMoves();
    };
    Piece.prototype.getLegalMoves = function () {
        var _this = this;
        return this.getMoves().filter(function (square) {
            if (square.piece && square.piece.color == _this.color)
                return false;
            return true;
        });
    };
    Piece.prototype.getMoves = function () {
        throw new Error("Not implemented");
    };
    Piece.prototype.getMovesByVectors = function (vectors, limit) {
        if (limit === void 0) { limit = undefined; }
        var moves = [], steps, vector, square;
        for (var i = 0, l = vectors.length; i < l; i++) {
            steps = 0;
            vector = vectors[i];
            square = this.square;
            // Add all squares in path
            while (square = square.getSibling(vector[0], vector[1])) {
                if (square.getPiece()) {
                    // Square is occupied by opponent
                    if (square.getPiece().color != this.color) {
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
    };
    Piece.prototype.getSymbol = function () {
        return COLORS.getName(this.color) + this.type;
    };
    Piece.prototype.BeforePieceMoved = function (piece, square) {
        // Not implemented
    };
    Piece.prototype.AfterPieceMoved = function (piece, square) {
        // Not implemented
    };
    Piece.prototype.addHistory = function (data) {
        this.board.addHistory(this, data);
    };
    return Piece;
}());
exports.Piece = Piece;
;

//# sourceMappingURL=Piece.js.map
