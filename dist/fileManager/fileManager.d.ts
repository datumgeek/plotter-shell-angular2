import { Http } from '@angular/http';
import 'rxjs/Rx';
import { IFileManager } from 'plotter-shell-model/dist/lib/util';
export declare class FileManager implements IFileManager {
    private http;
    homePath: string;
    constructor(http: Http);
    get(segments: string[]): Promise<string>;
    set(segments: string[], content: string): Promise<boolean>;
}
