import { Injectable } from '@angular/core';
import { FileManager } from './fileManager/fileManager';
import { PlotterShellModel, StateDirectory, ViewInstance, ViewInstanceJSON } from 'plotter-shell-model/dist/lib';
import { PubSubCustomSubject } from './pubSub/pubSubCustomSubject';
import { PubSubEventBus } from './pubSub/pubSubEventBus';
import { Observable } from 'RxJS';

@Injectable()
export class ShellService {
    public plotterShellModel: PlotterShellModel;
    public pubSubEventBus = new PubSubEventBus();
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

    public start(baseUrl?: string) {
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

    public launchViewInstanceJSON = (viewInstanceJSON: ViewInstanceJSON, reuseTab: boolean) => {
        this.launchViewInstance(ViewInstance.fromJSON(viewInstanceJSON), reuseTab);
    }
    public launchViewInstance = (viewInstance: ViewInstance, reuseTab: boolean) => {
        if (!reuseTab) {
            this.launchViewInstanceInNewTab(viewInstance);
        } else {
            let foundViewInstance = this.mainViewInstances.find(vi => vi.uniqueId === viewInstance.uniqueId);
            if (foundViewInstance) { this.replaceViewInstance(foundViewInstance, viewInstance); }
            else {
                foundViewInstance = this.altViewInstances.find(vi => vi.uniqueId === viewInstance.uniqueId);
                if (foundViewInstance) { this.replaceViewInstance(foundViewInstance, viewInstance); }
                else {
                    foundViewInstance = this.altViewInstances.find(vi => vi.uniqueId === viewInstance.uniqueId);
                    if (foundViewInstance) { this.replaceViewInstance(foundViewInstance, viewInstance); }
                    else { this.launchViewInstanceInNewTab(viewInstance); }
                }
            }
        }
    }
    public launchViewInstanceInNewTab = (viewInstance: ViewInstance) => {
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
    public replaceViewInstance = (oldViewInstance: ViewInstance, newViewInstance: ViewInstance) => {
        oldViewInstance.activePak = newViewInstance.activePak;
        oldViewInstance.cmodule = newViewInstance.cmodule;
        oldViewInstance.component = newViewInstance.component;
        oldViewInstance.hideClose = newViewInstance.hideClose;
        newViewInstance.paneType = oldViewInstance.paneType; // leave it where it was found
        oldViewInstance.state = newViewInstance.state;
        oldViewInstance.title = newViewInstance.title;
        oldViewInstance.uniqueId = newViewInstance.uniqueId;
        oldViewInstance.view = newViewInstance.view;
        oldViewInstance.viewId = newViewInstance.viewId;

        this.focusViewInstance(oldViewInstance);
    }
}