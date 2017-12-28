import { Piece } from "../Piece";
export declare class KnightPiece extends Piece {
    name: string;
    type: string;
    static MovementVectors: number[][];
    getMoves(): any[];
}
