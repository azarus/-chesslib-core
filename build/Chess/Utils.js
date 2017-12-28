"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessEvent = /** @class */ (function () {
    function ChessEvent() {
        this.messageObject = null;
        this._defaultPervented = false;
        this._shouldPropagate = true;
    }
    ChessEvent.prototype.preventDefault = function () {
        this._defaultPervented = true;
    };
    ChessEvent.prototype.isPrevented = function () {
        return this._defaultPervented;
    };
    ChessEvent.prototype.trigger = function () {
        if (this.messageObject) {
            this.messageObject();
        }
    };
    ChessEvent.prototype.stopPropagation = function () {
        this._shouldPropagate = false;
    };
    ChessEvent.prototype.shouldPropagate = function () {
        return this._shouldPropagate;
    };
    return ChessEvent;
}());
exports.ChessEvent = ChessEvent;
;
var ChessEventEmitter = /** @class */ (function () {
    function ChessEventEmitter() {
        this.listeners = [];
    }
    ChessEventEmitter.prototype.emit = function (event, messageObject) {
        if (messageObject === void 0) { messageObject = null; }
        event.messageObject = messageObject;
        this.listeners.forEach(function (callback) {
            if (event.shouldPropagate()) {
                callback(event);
            }
        });
    };
    ChessEventEmitter.prototype.broadcast = function (messsage) {
        this.listeners.forEach(function (callback) {
            callback(event);
        });
    };
    ChessEventEmitter.prototype.on = function (callback) {
        this.listeners.push(callback);
    };
    ChessEventEmitter.prototype.off = function (callback) {
        this.listeners.splice(this.listeners.indexOf(callback), 1);
    };
    return ChessEventEmitter;
}());
exports.ChessEventEmitter = ChessEventEmitter;
;

//# sourceMappingURL=Utils.js.map
