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
var BishopPiece = /** @class */ (function (_super) {
    __extends(BishopPiece, _super);
    function BishopPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Bishop";
        _this.type = "B";
        return _this;
    }
    BishopPiece.prototype.getMoves = function () {
        return this.getMovesByVectors(Piece_1.MovementVectors.Diagonal);
    };
    return BishopPiece;
}(Piece_1.Piece));
exports.BishopPiece = BishopPiece;
;

//# sourceMappingURL=Bishop.js.map
