"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square_1 = require("./Square");
var Piece_1 = require("./Piece");
// Pieces
var Pawn_1 = require("./Pieces/Pawn");
var Bishop_1 = require("./Pieces/Bishop");
var Knight_1 = require("./Pieces/Knight");
var Rook_1 = require("./Pieces/Rook");
var Queen_1 = require("./Pieces/Queen");
var King_1 = require("./Pieces/King");
// Third Party
var Utils_1 = require("./Utils");
var Chessboard = /** @class */ (function () {
    function Chessboard(sizeX, sizeY) {
        if (sizeX === void 0) { sizeX = 8; }
        if (sizeY === void 0) { sizeY = 8; }
        this.boardSize = {
            x: 8,
            y: 8,
        };
        this.history = [];
        this.squares = new Array();
        this.onPromote = new Utils_1.ChessEventEmitter();
        this.onCastled = new Utils_1.ChessEventEmitter();
        this.boardSize.x = sizeX;
        this.boardSize.y = sizeY;
        this.reset();
    }
    Chessboard.fromPosition = function (position) {
        var sizeY = position.length;
        var sizeX = position[0].length;
        var board = new Chessboard(sizeX, sizeY);
        board.loadPositions(position);
        return board;
    };
    Chessboard.prototype.clone = function () {
        return Chessboard.fromPosition(this.savePositions());
    };
    Chessboard.prototype.reset = function () {
        this.squares = new Array();
        for (var y = 0; y < this.boardSize.y; ++y) {
            this.squares[y] = new Array();
            for (var x = 0; x < this.boardSize.x; ++x) {
                this.squares[y][x] = new Square_1.Square(this, x, y);
            }
        }
        this.history = [];
    };
    Chessboard.prototype.forEach = function (callback) {
        for (var y = 0; y < this.boardSize.y; ++y) {
            for (var x = 0; x < this.boardSize.x; ++x) {
                callback(this.squares[y][x], x, y);
            }
        }
    };
    Chessboard.prototype.forEachPiece = function (callback) {
        this.forEach(function (square, x, y) {
            if (square.piece) {
                callback(square.piece, x, y, square);
            }
        });
    };
    Chessboard.prototype.findPieces = function (pieceType, color) {
        if (pieceType === void 0) { pieceType = null; }
        if (color === void 0) { color = null; }
        var pieces = [];
        this.forEachPiece(function (piece) {
            if (pieceType && piece.type != pieceType)
                return;
            if (color && piece.color != color)
                return;
            pieces.push(piece);
        });
        return pieces;
    };
    Chessboard.prototype.map = function (callback) {
        var newSquares = new Array();
        for (var y = 0; y < this.boardSize.y; ++y) {
            newSquares[y] = new Array();
            for (var x = 0; x < this.boardSize.x; ++x) {
                newSquares[y][x] = callback(this.squares[y][x], x, y);
            }
        }
        return newSquares;
    };
    Chessboard.prototype.loadPositions = function (positions) {
        this.reset();
        if (positions.length > this.boardSize.y || positions[0].length > this.boardSize.x) {
            return false;
        }
        for (var y = 0; y < positions.length; ++y) {
            for (var x = 0; x < positions[y].length; ++x) {
                var square = this.getSquare(x, y);
                this.setSquare(square, positions[y][x][1], Piece_1.COLORS.getColor(positions[y][x][0]));
            }
        }
        return true;
    };
    Chessboard.prototype.savePositions = function () {
        var positions = [];
        for (var y = 0; y < this.boardSize.y; ++y) {
            positions[y] = [];
            for (var x = 0; x < this.boardSize.x; ++x) {
                if (this.squares[y][x].piece) {
                    positions[y][x] = Piece_1.COLORS.getName(this.squares[y][x].piece.color) + this.squares[y][x].piece.type;
                }
                else {
                    positions[y][x] = "";
                }
            }
        }
        return positions;
    };
    Chessboard.prototype.setBoard = function (board) {
        this.reset();
        var keys = Object.keys(board);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var square = this.FENToSquare(key);
            if (!square)
                return;
            var color = board[key][0];
            var piece = board[key][1];
            this.setSquare(square, piece, Piece_1.COLORS.getColor(color));
        }
    };
    Chessboard.prototype.getBoard = function () {
        var _this = this;
        var positions = {};
        this.forEach(function (square) {
            if (square.piece) {
                positions[_this.SquareToFEN(square)] = square.piece.getSymbol();
            }
        });
        return positions;
    };
    Chessboard.prototype.getSquare = function (x, y) {
        if (x >= (this.boardSize.x) || x < 0 || y >= (this.boardSize.y) || y < 0)
            return null;
        return this.squares[y][x];
    };
    Chessboard.prototype.setSquare = function (square, type, color) {
        if (!square)
            return null;
        if (!type)
            return this.clearSquare(square);
        if (!Chessboard.PIECES[type])
            return null;
        return this.createPiece(type, color, square);
    };
    Chessboard.prototype.createPiece = function (type, color, square) {
        var newPiece = new Chessboard.PIECES[type](this, square);
        newPiece.setColor(color);
        newPiece.initialize();
        return newPiece;
    };
    Chessboard.prototype.setPiece = function (square, piece) {
        if (!square)
            return false;
        // Remove the old piece from the square
        if (square.piece) {
            square.piece.square = null;
        }
        // Set the new piece
        square.piece = piece;
        if (piece) {
            piece.square = square;
        }
        return true;
    };
    Chessboard.prototype.clearSquare = function (square) {
        if (square.piece) {
            square.piece.setSquare(null);
            square.setPiece(null);
        }
    };
    Chessboard.prototype.isValidMoveFEN = function (from, to) {
        var fromSquare = this.FENToSquare(from);
        var toSquare = this.FENToSquare(to);
        return this.isValidMove(fromSquare, toSquare);
    };
    Chessboard.prototype.isValidMove = function (from, to) {
        if (!from || !to)
            return false;
        if (!from.piece)
            return false;
        return !!this.getAllowedMovesOf(from.piece).find(function (move) {
            if (from == move.from && to == move.to)
                return true;
            return false;
        });
    };
    Chessboard.prototype.doMove = function (move) {
        this.move(move.from, move.to);
    };
    Chessboard.prototype.doMoveFEN = function (move) {
        this.tryMoveFEN(move.from, move.to);
    };
    Chessboard.prototype.move = function (from, to, simulatedMove) {
        if (simulatedMove === void 0) { simulatedMove = false; }
        if (!from || !to)
            return false;
        if (!from.piece)
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
    };
    Chessboard.prototype.addHistory = function (piece, data) {
        var history = {
            piece: piece,
            data: data,
        };
        this.history[this.history.length - 1].push(history);
    };
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
    Chessboard.prototype.undo = function () {
        var history = this.history.pop();
        if (!history) {
            return null;
        }
        var historySize = history.length;
        for (var i = 0; i < historySize; ++i) {
            var event = history.pop();
            event.piece.undo(event.data);
        }
        return history;
    };
    Chessboard.prototype.moveFEN = function (from, to, simulatedMove) {
        if (simulatedMove === void 0) { simulatedMove = false; }
        var fromSquare = this.FENToSquare(from);
        var toSquare = this.FENToSquare(to);
        return this.move(fromSquare, toSquare, simulatedMove);
    };
    Chessboard.prototype.tryMove = function (from, to, simulatedMove) {
        if (simulatedMove === void 0) { simulatedMove = false; }
        if (!this.isValidMove(from, to))
            return false;
        return this.move(from, to, simulatedMove);
    };
    Chessboard.prototype.tryMoveFEN = function (from, to, simulatedMove) {
        if (simulatedMove === void 0) { simulatedMove = false; }
        var fromSquare = this.FENToSquare(from);
        var toSquare = this.FENToSquare(to);
        if (!this.isValidMove(fromSquare, toSquare)) {
            return false;
        }
        return this.move(fromSquare, toSquare, simulatedMove);
    };
    Chessboard.prototype.getAllowedMovesOf = function (piece) {
        return piece.getAllowedMoves().map(function (toSquare) {
            return {
                from: piece.square,
                to: toSquare,
            };
        });
    };
    Chessboard.prototype.getMovesOf = function (piece) {
        return piece.getLegalMoves().map(function (toSquare) {
            return {
                from: piece.square,
                to: toSquare,
            };
        });
    };
    Chessboard.prototype.getMovesAtFEN = function (fen) {
        var square = this.FENToSquare(fen);
        if (square && square.piece) {
            return this.getAllowedMovesOf(square.piece);
        }
        return [];
    };
    Chessboard.prototype.getFENMovesatFEN = function (fen) {
        var _this = this;
        return this.getMovesAtFEN(fen).map(function (move) {
            move.from = _this.PositionToFEN(move.from.x, move.from.y);
            move.to = _this.PositionToFEN(move.to.x, move.to.y);
            return move;
        });
    };
    Chessboard.prototype.getMoves = function (color) {
        var _this = this;
        if (color === void 0) { color = null; }
        var moves = [];
        this.forEachPiece(function (piece) {
            if (color !== null && color != piece.color) {
                //console.log("not same color?");
                return;
            }
            moves.push.apply(moves, _this.getAllowedMovesOf(piece));
        });
        return moves;
    };
    Chessboard.prototype.getMovesFEN = function (color) {
        var _this = this;
        if (color === void 0) { color = null; }
        return this.getMoves(color).map(function (move) {
            move.from = _this.PositionToFEN(move.from.x, move.from.y);
            move.to = _this.PositionToFEN(move.to.x, move.to.y);
            return move;
        });
    };
    Chessboard.prototype.PositionToFEN = function (x, y) {
        return this.charIndex(x) + (this.boardSize.y - y);
    };
    Chessboard.prototype.FENtoPosition = function (fen) {
        return {
            x: this.indexOfChar(fen[0]),
            y: (this.boardSize.y - fen[1])
        };
    };
    Chessboard.prototype.FENToSquare = function (fen) {
        var position = this.FENtoPosition(fen);
        return this.getSquare(position.x, position.y);
    };
    Chessboard.prototype.SquareToFEN = function (square) {
        var position = square.getPosition();
        return this.PositionToFEN(position.x, position.y);
    };
    Chessboard.prototype.charIndex = function (index) {
        return Chessboard.SIDE[index];
    };
    Chessboard.prototype.indexOfChar = function (char) {
        return Chessboard.SIDE.indexOf(char);
    };
    Chessboard.prototype.clearDebug = function () {
        this.forEach(function (square) {
            square.debug = false;
        });
    };
    Chessboard.prototype.debugSquare = function (square, debugColor) {
        square.debug = debugColor;
    };
    Chessboard.prototype.debugFEN = function (fen, debugColor) {
        var square = this.FENToSquare(fen);
        if (square) {
            square.debug = debugColor;
        }
    };
    Chessboard.prototype.debugMoves = function (fen, debugColor) {
        var square = this.FENToSquare(fen);
        if (square && square.piece) {
            var piece = square.getPiece();
            var moves = piece.getLegalMoves();
            moves.forEach(function (square) {
                square.debug = debugColor;
            });
            return true;
        }
        return false;
    };
    Chessboard.SIDE = "abcdefghijklmnopqrstuvwxyz";
    Chessboard.RANKS = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"];
    Chessboard.PIECES = {
        P: Pawn_1.PawnPiece,
        B: Bishop_1.BishopPiece,
        N: Knight_1.KnightPiece,
        R: Rook_1.RookPiece,
        Q: Queen_1.QueenPiece,
        K: King_1.KingPiece,
    };
    return Chessboard;
}());
exports.Chessboard = Chessboard;
;

//# sourceMappingURL=Chessboard.js.map
