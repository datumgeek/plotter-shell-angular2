import { Injectable } from '@angular/core';
import { FileManager } from './fileManager/fileManager';
import { PlotterShellModel, StateDirectory } from 'plotter-shell-model/dist/lib/index';

@Injectable()
export class ShellService {
    public plotterShellModel: PlotterShellModel;

    constructor(public fileManager: FileManager) {}

    public start() {
        this.plotterShellModel = new PlotterShellModel(this.fileManager);
        return this.plotterShellModel.start();
    }
}