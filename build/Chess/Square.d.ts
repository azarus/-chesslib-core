export declare class Square {
    piece: any;
    board: any;
    x: number;
    y: number;
    constructor(board: any, x: any, y: any);
    setPiece(piece: any): void;
    getPiece(): any;
    getSibling(offsetX: any, offsetY: any): any;
    getColor(): "w" | "b";
    getPosition(): {
        x: number;
        y: number;
    };
    getFENPosition(): any;
}
