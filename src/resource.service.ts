import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable()
export class ResourceService {
    resources: Object = {};
    keys: string[] = [];

    constructor() {
        if ((<any>window).plotterPaths) {
            for (let key in (<any>window).plotterPaths) {
                this.resources[key] = (<any>window).plotterPaths[key];
                this.keys.push(key);
            };
        }
    }
}
