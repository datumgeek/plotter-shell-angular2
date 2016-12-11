import { FileManager } from './fileManager/fileManager';
import { PlotterShellModel, StateDirectory, ViewInstance, ViewInstanceJSON } from 'plotter-shell-model/dist/lib';
import { PubSubEventBus } from './pubSub/pubSubEventBus';
export declare class ShellService {
    fileManager: FileManager;
    plotterShellModel: PlotterShellModel;
    pubSubEventBus: PubSubEventBus;
    started: Promise<StateDirectory>;
    constructor(fileManager: FileManager);
    start(baseUrl?: string): Promise<StateDirectory>;
    navViewInstances: ViewInstance[];
    navActiveViewInstance: any;
    mainViewInstances: ViewInstance[];
    mainActiveViewInstance: any;
    mainCollapsed: boolean;
    altViewInstances: ViewInstance[];
    altActiveViewInstance: any;
    altCollapsed: boolean;
    focusViewInstance: (viewInstance: ViewInstance) => void;
    launchViewInstanceJSON: (viewInstanceJSON: ViewInstanceJSON, reuseTab: boolean) => void;
    launchViewInstance: (viewInstance: ViewInstance, reuseTab: boolean) => void;
    launchViewInstanceInNewTab: (viewInstance: ViewInstance) => void;
    replaceViewInstance: (oldViewInstance: ViewInstance, newViewInstance: ViewInstance) => void;
}
