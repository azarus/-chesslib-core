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
var KnightPiece = /** @class */ (function (_super) {
    __extends(KnightPiece, _super);
    function KnightPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Knight";
        _this.type = "N";
        return _this;
    }
    KnightPiece.prototype.getMoves = function () {
        return this.getMovesByVectors(KnightPiece.MovementVectors, 1);
    };
    KnightPiece.MovementVectors = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
    return KnightPiece;
}(Piece_1.Piece));
exports.KnightPiece = KnightPiece;
;

//# sourceMappingURL=Knight.js.map
