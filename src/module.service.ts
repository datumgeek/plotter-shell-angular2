import { Injectable, Injector, Compiler, ModuleWithComponentFactories, ComponentFactory } from '@angular/core';

@Injectable()
export class ModuleService {

    public moduleCatalog: IModuleCatalogItem[] = [];

    constructor(
        private injector: Injector,
        private compiler: Compiler
    ) { }

    public getModule(modulePath: string): Promise<IModuleCatalogItem> {

        let moduleCatalogItem = this.moduleCatalog.find(item => item.modulePath === modulePath);
        if (moduleCatalogItem) {
            return moduleCatalogItem.moduleCatalogItemPromise;
        }

        moduleCatalogItem = {
            modulePath: modulePath,
            hasError: false
        };
        moduleCatalogItem.moduleCatalogItemPromise = this.createModule(modulePath, moduleCatalogItem);
        this.moduleCatalog.push(moduleCatalogItem);

        return moduleCatalogItem.moduleCatalogItemPromise;
    }

    private createModule(modulePath: string, moduleCatalogItem): Promise<IModuleCatalogItem> {
        return new Promise<IModuleCatalogItem>((resolve, reject) => {

            (<any>window).require([modulePath], (cmodule) => {
                let moduleType = cmodule["default"];
                if (!moduleType) {
                    moduleCatalogItem.hasError = true;
                    moduleCatalogItem.errorMessage = `Error in Compose: Failed to get Type for ${modulePath}`
                    reject(moduleCatalogItem.errorMessage);
                    return;
                }

                this.compiler.compileModuleAndAllComponentsAsync(moduleType)
                    .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
                        const ref = moduleWithFactories.ngModuleFactory.create(this.injector);
                        moduleCatalogItem.injector = ref.injector;
                        moduleCatalogItem.componentFactories = moduleWithFactories.componentFactories;
                        resolve(moduleCatalogItem);
                        return;
                    });
            });
        });
    }
}

export interface IModuleCatalogItem {

    modulePath: string;
    moduleCatalogItemPromise?: Promise<IModuleCatalogItem>;

    injector?: Injector;
    componentFactories?: ComponentFactory<any>[];

    hasError: boolean;
    errorMessage?: string;
}