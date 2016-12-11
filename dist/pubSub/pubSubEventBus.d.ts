import { PubSubCustomSubject } from './pubSubCustomSubject';
import { Subscription } from 'rxjs/Rx';
export { Subscription } from 'rxjs/Rx';
export declare class PubSubEventBus {
    subjects: PubSubCustomSubject<any>[];
    publish: (subjectName: string, value: any) => void;
    subscribe: (subjectName: string, f: (value: any) => void, error?: (error: any) => void, complete?: () => void) => Subscription;
}
