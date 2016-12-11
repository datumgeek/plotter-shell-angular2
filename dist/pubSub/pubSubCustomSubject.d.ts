import * as Rx from 'rxjs/Rx';
export declare class PubSubCustomSubject<T> extends Rx.Subject<T> {
    onCompleted(): void;
    onError(error: any): void;
}
