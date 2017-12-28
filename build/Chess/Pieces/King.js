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
var KingPiece = /** @class */ (function (_super) {
    __extends(KingPiece, _super);
    function KingPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "King";
        _this.type = "K";
        return _this;
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
    }
    KingPiece.prototype.move = function (square) {
        if (Math.abs(square.getPosition().x - this.square.getPosition().x) > 1) {
            // Castle Left rook
            if (square.getPosition().x - this.square.getPosition().x < 0) {
                return this.castle(-4, -1, -2);
            }
            // Castle Right rook
            if (square.getPosition().x - this.square.getPosition().x > 0) {
                return this.castle(3, 1, 2);
            }
        }
        if (!_super.prototype.move.call(this, square))
            return false;
        return true;
    };
    KingPiece.prototype.getMoves = function () {
        return this.getCastlingMoves([[-1, 0, 4], [1, 0, 3]], 2, 'R');
    };
    KingPiece.prototype.getCastlingMoves = function (vectors, distance, castlingPieceType) {
        var moves = this.getMovesByVectors(Piece_1.MovementVectors.Omni, 1);
        if (this.moves > 0)
            return moves;
        var steps, vector, square;
        for (var i = 0, l = vectors.length; i < l; i++) {
            steps = 0;
            vector = vectors[i];
            square = this.square;
            // Check if the castling piece is available
            var castlingTarget = this.square.getSibling(vector[0] * vector[2], vector[1] * vector[2]);
            if (castlingTarget && castlingTarget.piece && castlingTarget.piece.type == castlingPieceType && castlingTarget.piece.color == this.color && castlingTarget.piece.moves == 0) {
                // Add all squares in path
                while (square = square.getSibling(vector[0], vector[1])) {
                    // Square is occupied
                    if (square.getPiece()) {
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
    };
    KingPiece.prototype.castle = function (rookPosition, kingPosition, castlePosition) {
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
        return _super.prototype.move.call(this, castlingSquare);
    };
    return KingPiece;
}(Piece_1.Piece));
exports.KingPiece = KingPiece;
;

//# sourceMappingURL=King.js.map
