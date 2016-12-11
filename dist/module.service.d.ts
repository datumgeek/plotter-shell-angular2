import { Injector, Compiler, ComponentFactory } from '@angular/core';
export declare class ModuleService {
    private injector;
    private compiler;
    moduleCatalog: IModuleCatalogItem[];
    constructor(injector: Injector, compiler: Compiler);
    getModule(modulePath: string): Promise<IModuleCatalogItem>;
    private createModule(modulePath, moduleCatalogItem);
}
export interface IModuleCatalogItem {
    modulePath: string;
    moduleCatalogItemPromise?: Promise<IModuleCatalogItem>;
    injector?: Injector;
    componentFactories?: ComponentFactory<any>[];
    hasError: boolean;
    errorMessage?: string;
}
