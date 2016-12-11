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
var module_service_1 = require('../module.service');
var ComposeComponent = (function () {
    function ComposeComponent(moduleService, injector, compiler, componentFactorResolver) {
        this.moduleService = moduleService;
        this.injector = injector;
        this.compiler = compiler;
        this.componentFactorResolver = componentFactorResolver;
        this.pParentVisible = true;
        this.isViewInitialized = false;
        this.hasError = false;
        this.errorTitle = '';
        this.errorMessage = '';
    }
    ComposeComponent.prototype.loadSubcomponent = function () {
        var _this = this;
        var that = this;
        if (!this.isViewInitialized) {
            return;
        }
        if (this.comp) {
            this.comp.destroy();
        }
        this.moduleService.getModule(this.cmodule)
            .then(function (moduleCatalogItem) {
            var factory = moduleCatalogItem.componentFactories
                .find(function (x) { return x.componentType.name === that.component; });
            if (!factory) {
                that.hasError = true;
                that.errorTitle = "Error in Compose: Failed to find factory for " + that.component;
                that.errorMessage = "within module " + that.cmodule;
            }
            else {
                // const injector = ReflectiveInjector.fromResolvedProviders([], this.injector);
                //let refInj = ReflectiveInjector.resolveAndCreate([t])
                that.comp = that.placeholderRef.createComponent(factory, null, moduleCatalogItem.injector, []);
                if (!that.comp) {
                    that.hasError = true;
                    that.errorTitle = "Error in Compose: Create Component Failed for " + that.component;
                    that.errorMessage = "within module " + that.cmodule;
                }
                else {
                    if (that.state) {
                        if (typeof that.comp.instance.setDynState == 'function') {
                            that.comp.instance.setDynState(that.state);
                        }
                        _this.comp.instance.pParentVisible = _this.pParentVisible;
                    }
                }
            }
        }).catch(function (err) {
            that.hasError = true;
            that.errorTitle = "Error in Compose: Failed to compile Type for " + that.cmodule;
            that.errorMessage = "err: " + JSON.stringify(err);
        });
    };
    ComposeComponent.prototype.ngOnInit = function () {
    };
    ComposeComponent.prototype.ngOnChanges = function (changes) {
        var changesProp = changes;
        if (changesProp.cmodule || changesProp.component) {
            this.loadSubcomponent();
        }
        else {
            if (changesProp.state) {
                if (typeof this.comp.instance.setDynState == 'function') {
                    this.comp.instance.setDynState(changes['state'].currentValue);
                }
            }
            if (changesProp.pParentVisible) {
                this.comp.instance.pParentVisible = changes['pParentVisible'].currentValue;
            }
        }
    };
    ComposeComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.loadSubcomponent();
    };
    ComposeComponent.prototype.ngOnDestroy = function () {
        if (this.comp) {
            this.comp.destroy();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ComposeComponent.prototype, "cmodule", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ComposeComponent.prototype, "component", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ComposeComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input('p-parent-visible'), 
        __metadata('design:type', Boolean)
    ], ComposeComponent.prototype, "pParentVisible", void 0);
    __decorate([
        core_1.ViewChild("placeholder", { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ComposeComponent.prototype, "placeholderRef", void 0);
    ComposeComponent = __decorate([
        core_1.Component({
            selector: 'p-compose',
            template: "\n    <div #placeholder *ngIf=\"!hasError\"></div>\n    <div *ngIf=\"hasError\">\n      <h3>Error {{ errorTitle }}</h3>\n      <p>{{ errorMessage }}</p>\n    </div>\n    ",
            styles: ["\n    :host {\n      position: relative;\n    }\n\n    :host div {\n      position: relative;\n      margin: 0;\n      padding: 0;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      overflow: hidden;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [module_service_1.ModuleService, core_1.Injector, core_1.Compiler, core_1.ComponentFactoryResolver])
    ], ComposeComponent);
    return ComposeComponent;
}());
exports.ComposeComponent = ComposeComponent;
//# sourceMappingURL=compose.component.js.map