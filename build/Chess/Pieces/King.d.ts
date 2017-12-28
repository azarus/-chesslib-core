import { Piece } from "../Piece";
export declare class KingPiece extends Piece {
    name: string;
    type: string;
    move(square: any): boolean;
    getMoves(): any[];
    getCastlingMoves(vectors: any, distance: any, castlingPieceType: any): any[];
    castle(rookPosition: any, kingPosition: any, castlePosition: any): boolean;
}
