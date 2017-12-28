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
var RookPiece = /** @class */ (function (_super) {
    __extends(RookPiece, _super);
    function RookPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Rook";
        _this.type = "R";
        return _this;
    }
    RookPiece.prototype.getMoves = function () {
        return this.getMovesByVectors(Piece_1.MovementVectors.Lateral);
    };
    return RookPiece;
}(Piece_1.Piece));
exports.RookPiece = RookPiece;
;

//# sourceMappingURL=Rook.js.map
