"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ModuleService = (function () {
    function ModuleService(injector, compiler) {
        this.injector = injector;
        this.compiler = compiler;
        this.moduleCatalog = [];
    }
    ModuleService.prototype.getModule = function (modulePath) {
        var moduleCatalogItem = this.moduleCatalog.find(function (item) { return item.modulePath === modulePath; });
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
    };
    ModuleService.prototype.createModule = function (modulePath, moduleCatalogItem) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.require([modulePath], function (cmodule) {
                var moduleType = cmodule["default"];
                if (!moduleType) {
                    moduleCatalogItem.hasError = true;
                    moduleCatalogItem.errorMessage = "Error in Compose: Failed to get Type for " + modulePath;
                    reject(moduleCatalogItem.errorMessage);
                    return;
                }
                _this.compiler.compileModuleAndAllComponentsAsync(moduleType)
                    .then(function (moduleWithFactories) {
                    var ref = moduleWithFactories.ngModuleFactory.create(_this.injector);
                    moduleCatalogItem.injector = ref.injector;
                    moduleCatalogItem.componentFactories = moduleWithFactories.componentFactories;
                    resolve(moduleCatalogItem);
                    return;
                });
            });
        });
    };
    ModuleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.Injector, core_1.Compiler])
    ], ModuleService);
    return ModuleService;
}());
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map