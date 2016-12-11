import { Params } from '@angular/router';
export declare class ParameterService {
    params: Map<string, any>;
    paramArray: Array<{
        key: string;
        value: any;
    }>;
    load(params: Params): void;
}
