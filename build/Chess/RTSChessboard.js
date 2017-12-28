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
var Chessboard_1 = require("./Chessboard");
var RTSChessboard = /** @class */ (function (_super) {
    __extends(RTSChessboard, _super);
    function RTSChessboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PIECE_DELAY_CONFIG = {
            P: 4000,
            N: 5000,
            B: 5000,
            R: 5000,
            Q: 4000,
            K: 5000,
        };
        _this.GameSpeed = 1;
        return _this;
    }
    RTSChessboard.prototype.SetSpeed = function (GameSpeed) {
        this.GameSpeed = GameSpeed;
    };
    RTSChessboard.prototype.getMoveTimeForPiece = function (pieceType) {
        return this.PIECE_DELAY_CONFIG[pieceType] / this.GameSpeed;
    };
    RTSChessboard.prototype.getAllowedMovesOf = function (piece) {
        if (piece.lastMoved > Date.now() - this.getMoveTimeForPiece(piece.type)) {
            return [];
        }
        return _super.prototype.getAllowedMovesOf.call(this, piece);
    };
    return RTSChessboard;
}(Chessboard_1.Chessboard));
exports.RTSChessboard = RTSChessboard;
;

//# sourceMappingURL=RTSChessboard.js.map
