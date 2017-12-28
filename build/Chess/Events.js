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
var Utils_1 = require("./Utils");
var ChessMoveEvent = /** @class */ (function (_super) {
    __extends(ChessMoveEvent, _super);
    function ChessMoveEvent(from, to, time) {
        if (time === void 0) { time = 0; }
        var _this = _super.call(this) || this;
        _this.from = null;
        _this.to = null;
        _this.time = null;
        _this.from = from;
        _this.to = to;
        _this.time = time;
        return _this;
    }
    return ChessMoveEvent;
}(Utils_1.ChessEvent));
exports.ChessMoveEvent = ChessMoveEvent;
;
var ChessPromoteEvent = /** @class */ (function (_super) {
    __extends(ChessPromoteEvent, _super);
    function ChessPromoteEvent(square, piece, fen) {
        var _this = _super.call(this) || this;
        _this.fen = null;
        _this.piece = null;
        _this.square = null;
        _this.fen = fen;
        _this.piece = piece;
        _this.square = square;
        return _this;
    }
    return ChessPromoteEvent;
}(Utils_1.ChessEvent));
exports.ChessPromoteEvent = ChessPromoteEvent;
;

//# sourceMappingURL=Events.js.map
