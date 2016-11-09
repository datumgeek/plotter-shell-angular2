import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable()
export class ParameterService {
    params: Map<string, any> = new Map<string, any>();
    paramArray: Array<{key: string, value: any}> = [];
    load(params: Params) {
        for (let key in params) {
            this.params[key] = params[key];
            this.paramArray.push({"key": key, "value": params[key]});
        }
    }
}