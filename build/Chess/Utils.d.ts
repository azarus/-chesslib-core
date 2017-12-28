export declare class ChessEvent {
    messageObject: any;
    _defaultPervented: boolean;
    _shouldPropagate: boolean;
    preventDefault(): void;
    isPrevented(): boolean;
    trigger(): void;
    stopPropagation(): void;
    shouldPropagate(): boolean;
}
export declare class ChessEventEmitter {
    listeners: any[];
    emit(event: any, messageObject?: any): void;
    broadcast(messsage: any): void;
    on(callback: any): void;
    off(callback: any): void;
}
