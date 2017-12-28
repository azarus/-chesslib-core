"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square = /** @class */ (function () {
    function Square(board, x, y) {
        this.piece = null;
        this.board = null;
        this.x = -1;
        this.y = -1;
        this.board = board;
        this.x = x;
        this.y = y;
    }
    Square.prototype.setPiece = function (piece) {
        this.piece = piece;
    };
    Square.prototype.getPiece = function () {
        return this.piece;
    };
    Square.prototype.getSibling = function (offsetX, offsetY) {
        return this.board.getSquare(this.x + offsetX, this.y + offsetY);
    };
    Square.prototype.getColor = function () {
        var xor = function (a, b) { return !a != !b; };
        return xor(this.x % 2, this.y % 2) ? 'w' : 'b';
    };
    Square.prototype.getPosition = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Square.prototype.getFENPosition = function () {
        return this.board.PositionToFEN(this.x, this.y);
    };
    return Square;
}());
exports.Square = Square;

//# sourceMappingURL=Square.js.map
