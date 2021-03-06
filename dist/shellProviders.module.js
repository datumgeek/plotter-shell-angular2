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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var shell_service_1 = require('./shell.service');
var fileManager_1 = require('./fileManager/fileManager');
var module_service_1 = require('./module.service');
var parameter_service_1 = require('./parameter.service');
var resource_service_1 = require('./resource.service');
var ShellProvidersModule = (function () {
    function ShellProvidersModule() {
    }
    ShellProvidersModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [
                shell_service_1.ShellService,
                fileManager_1.FileManager,
                module_service_1.ModuleService,
                parameter_service_1.ParameterService,
                resource_service_1.ResourceService
            ],
            exports: []
        }), 
        __metadata('design:paramtypes', [])
    ], ShellProvidersModule);
    return ShellProvidersModule;
}());
exports.ShellProvidersModule = ShellProvidersModule;
//# sourceMappingURL=shellProviders.module.js.map