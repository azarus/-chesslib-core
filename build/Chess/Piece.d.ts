export declare class MovementVectors {
    static Diagonal: number[][];
    static Lateral: number[][];
    static Omni: number[][];
}
export declare class COLORS {
    static BLACK: number;
    static WHITE: number;
    static GREEN: number;
    static ORANGE: number;
    static getColor(color: any): any;
    static getName(color: any): string;
}
export declare class Piece {
    board: any;
    square: any;
    name: string;
    color: any;
    type: any;
    moves: number;
    index: any;
    pieceTimer: any;
    moveDelay: number;
    lastMoved: number;
    constructor(board: any, square: any);
    initialize(): void;
    setSquare(square: any): void;
    setColor(color: any): void;
    getColor(): any;
    move(square: any): boolean;
    undo(event: any): void;
    capture(square: any): void;
    getAllowedMoves(): any[];
    getLegalMoves(): any[];
    getMoves(): any[];
    getMovesByVectors(vectors: any, limit?: any): any[];
    getSymbol(): string;
    BeforePieceMoved(piece: any, square: any): void;
    AfterPieceMoved(piece: any, square: any): void;
    addHistory(data: any): void;
}
