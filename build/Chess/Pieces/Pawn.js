"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = require("../Piece");
var Events_1 = require("../Events");
var PawnPiece = /** @class */ (function (_super) {
    __extends(PawnPiece, _super);
    function PawnPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Pawn";
        _this.type = "P";
        _this.enpassant = false;
        return _this;
    }
    PawnPiece.prototype.move = function (square) {
        var current = this.square;
        // Set enpassant flag if it was a big move
        if (Math.abs(current.getPosition().y - square.getPosition().y) > 1) {
            this.enpassant = true;
        }
        else {
            this.enpassant = false;
        }
        if (!_super.prototype.move.call(this, square))
            return false;
        // Check if the move was enpassant capture
        var back = this.square.getSibling(0, (this.color == Piece_1.COLORS.WHITE ? 1 : -1));
        if (back && back.piece && back.piece.color != this.color && back.piece.enpassant) {
            this.capture(back);
        }
        // Queening
        var forwardSquare = this.square.getSibling(0, (this.color == Piece_1.COLORS.WHITE ? -1 : 1));
        if (!forwardSquare) {
            var newPiece = this.board.createPiece("Q", this.color);
            newPiece.setSquare(this.square);
            this.board.onPromote.emit(new Events_1.ChessPromoteEvent(this.square, newPiece, this.board.SquareToFEN(this.square)));
        }
        return true;
    };
    PawnPiece.prototype.onMoved = function (square) {
        this.board.addToHistory("move", {
            lastMoved: this.lastMoved,
            moves: this.moves,
            enpassant: this.enpassant,
            piece: this,
            from: this.square,
            to: square
        });
    };
    PawnPiece.prototype.undoMove = function (move) {
        this.enpassant = move.enpassant;
        this.lastMoved = move.lastMoved;
        this.moves = move.moves;
        this.setSquare(move.from);
    };
    PawnPiece.prototype.AfterPieceMoved = function (piece, square) {
        // If any piece is moved no enpassant moves are allowed
        // if(piece.color != this.color)
        // {
        // 	this.enpassant = false;
        // }
    };
    PawnPiece.prototype.getMoves = function () {
        var moves = [];
        var direction = (this.color == Piece_1.COLORS.WHITE ? -1 : 1);
        // 1 Forward
        var square1 = this.square.getSibling(0, direction);
        if (square1 && !square1.piece) {
            moves.push(square1);
        }
        // 2 Forward (if didn't move yet)
        var square2 = this.square.getSibling(0, direction * 2);
        if (square2 && !square2.piece && this.moves == 0 && !square1.piece) {
            moves.push(square2);
        }
        // Capture 1
        var capture1 = this.square.getSibling(1, direction);
        if (capture1 && capture1.piece && capture1.piece.color != this.color) {
            moves.push(capture1);
        }
        // Capture 2
        var capture2 = this.square.getSibling(-1, direction);
        if (capture2 && capture2.piece && capture2.piece.color != this.color) {
            moves.push(capture2);
        }
        // En passant capture 1
        var enpassant1 = this.square.getSibling(1, 0);
        if (enpassant1 && enpassant1.piece && enpassant1.piece.color != this.color && enpassant1.piece.moves == 1 && enpassant1.piece.enpassant) {
            moves.push(this.square.getSibling(1, direction));
        }
        /// En passant capture 2
        var enpassant2 = this.square.getSibling(-1, 0);
        if (enpassant2 && enpassant2.piece && enpassant2.piece.color != this.color && enpassant2.piece.moves == 1 && enpassant2.piece.enpassant) {
            moves.push(this.square.getSibling(-1, direction));
        }
        return moves;
    };
    return PawnPiece;
}(Piece_1.Piece));
exports.PawnPiece = PawnPiece;
;

//# sourceMappingURL=Pawn.js.map
