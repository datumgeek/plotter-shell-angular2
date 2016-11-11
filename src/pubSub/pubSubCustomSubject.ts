import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class PubSubCustomSubject<T> extends Rx.Subject<T> {
    onCompleted() {}
    onError(error) {
        this.error = error;
        this.observers.forEach((obs: Rx.Observer<T>) => {
            obs.closed = false;
            obs.error(error);
        });
    }
}