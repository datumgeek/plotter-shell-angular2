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
var lib_1 = require('plotter-shell-model/dist/lib');
var shell_service_1 = require('../shell.service');
var ShellToolbarComponent = (function () {
    function ShellToolbarComponent(shellService) {
        var _this = this;
        this.shellService = shellService;
        this.activeViewInstanceChange = new core_1.EventEmitter();
        this.moveItem = function (vi, index, viArr) {
            var that = _this;
            viArr.splice(index, 1);
            if (_this.activeViewInstance === vi && viArr.length > 0) {
                _this.setFocus(viArr[0]);
            }
            if (vi.paneType === 'alt') {
                vi.paneType = 'main';
                _this.shellService.launchViewInstance(vi, false);
            }
            else {
                vi.paneType = 'alt';
                _this.shellService.launchViewInstance(vi, false);
            }
        };
        this.removeItem = function (vi, index, viArr) {
            var that = _this;
            viArr.splice(index, 1);
            if (_this.activeViewInstance === vi && viArr.length > 0) {
                _this.setFocus(viArr[0]);
            }
        };
    }
    ShellToolbarComponent.prototype.ngOnInit = function () {
        var i = 7;
    };
    ShellToolbarComponent.prototype.setFocus = function (vi) {
        this.activeViewInstance = vi;
        this.activeViewInstanceChange.emit(vi);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', lib_1.ViewInstance)
    ], ShellToolbarComponent.prototype, "activeViewInstance", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ShellToolbarComponent.prototype, "activeViewInstanceChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ShellToolbarComponent.prototype, "viewInstances", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ShellToolbarComponent.prototype, "showTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ShellToolbarComponent.prototype, "showArrow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ShellToolbarComponent.prototype, "isUp", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ShellToolbarComponent.prototype, "moveToViewInstances", void 0);
    ShellToolbarComponent = __decorate([
        core_1.Component({
            selector: 'p-shell-toolbar',
            template: require('./shellToolbar.component.html'),
            styles: [""]
        }), 
        __metadata('design:paramtypes', [shell_service_1.ShellService])
    ], ShellToolbarComponent);
    return ShellToolbarComponent;
}());
exports.ShellToolbarComponent = ShellToolbarComponent;
//# sourceMappingURL=shellToolbar.component.js.map