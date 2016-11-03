import { Injectable } from '@angular/core';
import { FileManager } from './fileManager/fileManager';
import { PlotterShellModel, StateDirectory, ViewInstance } from 'plotter-shell-model/dist/lib';
import { Observable } from 'RxJS';

@Injectable()
export class ShellService {
    public plotterShellModel: PlotterShellModel;
    public started: Promise<StateDirectory>;

    constructor(public fileManager: FileManager) {
        this.started = this.start();
        this.started
            .then(stateDirectory => {
            })
            .catch(reason => {
                alert(`error starting state plotter.\r\n${reason}`);
            });
    }

    public start(baseUrl?:string) {
        this.plotterShellModel = new PlotterShellModel(this.fileManager);
        return this.plotterShellModel.start(baseUrl);
    }

    public navViewInstances = new Array<ViewInstance>();
    public navActiveViewInstance;

    public mainViewInstances = new Array<ViewInstance>();
    public mainActiveViewInstance;
    public mainCollapsed = false;

    public altViewInstances = new Array<ViewInstance>();
    public altActiveViewInstance;
    public altCollapsed = false;

    public focusViewInstance = (viewInstance: ViewInstance) => {
        switch (viewInstance.paneType) {
            case 'nav':
                this.navActiveViewInstance = viewInstance;
                break;

            case 'main':
                this.mainActiveViewInstance = viewInstance;
                break;

            case 'alt':
                this.altActiveViewInstance = viewInstance;
                break;

            default:
                break;
        }
    }

    public launchViewInstance = (viewInstance: ViewInstance) => {
        switch (viewInstance.paneType) {
            case 'nav':
                this.navViewInstances.push(viewInstance);
                if (!this.navActiveViewInstance) {
                    this.navActiveViewInstance = viewInstance;
                }
                break;

            case 'main':
                this.mainViewInstances.push(viewInstance);
                if (!this.mainActiveViewInstance) {
                    this.mainActiveViewInstance = viewInstance;
                }
                break;

            case 'alt':
                this.altViewInstances.push(viewInstance);
                if (!this.altActiveViewInstance) {
                    this.altActiveViewInstance = viewInstance;
                }
                break;

            default:
                break;
        }

        this.focusViewInstance(viewInstance);
    }
}