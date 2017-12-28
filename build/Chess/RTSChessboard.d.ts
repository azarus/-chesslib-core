import { Chessboard } from "./Chessboard";
export declare class RTSChessboard extends Chessboard {
    PIECE_DELAY_CONFIG: {
        P: number;
        N: number;
        B: number;
        R: number;
        Q: number;
        K: number;
    };
    GameSpeed: number;
    SetSpeed(GameSpeed: any): void;
    getMoveTimeForPiece(pieceType: any): number;
    getAllowedMovesOf(piece: any): any;
}
