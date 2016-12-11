import { OnInit, EventEmitter } from '@angular/core';
import { ViewInstance } from 'plotter-shell-model/dist/lib';
import { ShellService } from '../shell.service';
export declare class ShellToolbarComponent implements OnInit {
    private shellService;
    activeViewInstance: ViewInstance;
    activeViewInstanceChange: EventEmitter<ViewInstance>;
    viewInstances: ViewInstance[];
    showTitle: boolean;
    showArrow: boolean;
    isUp: boolean;
    moveToViewInstances: ViewInstance[];
    constructor(shellService: ShellService);
    ngOnInit(): void;
    setFocus(vi: ViewInstance): void;
    moveItem: (vi: ViewInstance, index: number, viArr: ViewInstance[]) => void;
    removeItem: (vi: ViewInstance, index: number, viArr: ViewInstance[]) => void;
}
