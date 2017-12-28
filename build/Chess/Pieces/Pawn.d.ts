import { Piece } from "../Piece";
export declare class PawnPiece extends Piece {
    name: string;
    type: string;
    enpassant: boolean;
    move(square: any): boolean;
    onMoved(square: any): void;
    undoMove(move: any): void;
    AfterPieceMoved(piece: any, square: any): void;
    getMoves(): any[];
}
