import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IFileManager } from 'plotter-shell-model/dist/lib/util';

@Injectable()
export class FileManager implements IFileManager {

    constructor(private http: Http) { }

    get(segments: string[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            reject("FileManager 'get' not implemented.");
        });
    }
    
    set(segments: string[], content: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("FileManager 'set' not implemented.");
        });
    }

}
