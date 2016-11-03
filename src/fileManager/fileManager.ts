import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { IFileManager } from 'plotter-shell-model/dist/lib/util';
import { PakDirectory } from 'plotter-shell-model/dist/lib/index';

@Injectable()
export class FileManager implements IFileManager {

    homePath: string = '';

    constructor(private http: Http) { 
        let plotterPaths = (<any>window).plotterPaths;
        if (plotterPaths && plotterPaths.home) {
            this.homePath = plotterPaths.home;
            if (!this.homePath.endsWith('/')) {
                this.homePath =`${this.homePath}/`;
            }
        }
    }

    get(segments: string[]): Promise<string> {
        let that = this;

        return new Promise<string>((resolve, reject) => {
            that.http.get(`${this.homePath}${segments.join('/')}`)
                .map((res: Response) => res.json())
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(new Error(`fetch pak-directory failed: reason: \r\n\r\n${err}`));
                });
        });
    }

    set(segments: string[], content: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("FileManager 'set' not implemented.");
        });
    }

}
