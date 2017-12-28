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
var QueenPiece = /** @class */ (function (_super) {
    __extends(QueenPiece, _super);
    function QueenPiece() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Queen";
        _this.type = "Q";
        return _this;
    }
    QueenPiece.prototype.getMoves = function () {
        return this.getMovesByVectors(Piece_1.MovementVectors.Omni);
    };
    return QueenPiece;
}(Piece_1.Piece));
exports.QueenPiece = QueenPiece;
;

//# sourceMappingURL=Queen.js.map
