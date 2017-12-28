import { ChessEvent } from "./Utils";
export declare class ChessMoveEvent extends ChessEvent {
    from: any;
    to: any;
    time: any;
    constructor(from: any, to: any, time?: number);
}
export declare class ChessPromoteEvent extends ChessEvent {
    fen: any;
    piece: any;
    square: any;
    constructor(square: any, piece: any, fen: any);
}
