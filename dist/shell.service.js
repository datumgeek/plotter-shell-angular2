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
var fileManager_1 = require('./fileManager/fileManager');
var lib_1 = require('plotter-shell-model/dist/lib');
var pubSubEventBus_1 = require('./pubSub/pubSubEventBus');
var ShellService = (function () {
    function ShellService(fileManager) {
        var _this = this;
        this.fileManager = fileManager;
        this.pubSubEventBus = new pubSubEventBus_1.PubSubEventBus();
        this.navViewInstances = new Array();
        this.mainViewInstances = new Array();
        this.mainCollapsed = false;
        this.altViewInstances = new Array();
        this.altCollapsed = false;
        this.focusViewInstance = function (viewInstance) {
            switch (viewInstance.paneType) {
                case 'nav':
                    _this.navActiveViewInstance = viewInstance;
                    break;
                case 'main':
                    _this.mainActiveViewInstance = viewInstance;
                    break;
                case 'alt':
                    _this.altActiveViewInstance = viewInstance;
                    break;
                default:
                    break;
            }
        };
        this.launchViewInstanceJSON = function (viewInstanceJSON, reuseTab) {
            _this.launchViewInstance(lib_1.ViewInstance.fromJSON(viewInstanceJSON), reuseTab);
        };
        this.launchViewInstance = function (viewInstance, reuseTab) {
            if (!reuseTab) {
                _this.launchViewInstanceInNewTab(viewInstance);
            }
            else {
                var foundViewInstance = _this.mainViewInstances.find(function (vi) { return vi.uniqueId === viewInstance.uniqueId; });
                if (foundViewInstance) {
                    _this.replaceViewInstance(foundViewInstance, viewInstance);
                }
                else {
                    foundViewInstance = _this.altViewInstances.find(function (vi) { return vi.uniqueId === viewInstance.uniqueId; });
                    if (foundViewInstance) {
                        _this.replaceViewInstance(foundViewInstance, viewInstance);
                    }
                    else {
                        foundViewInstance = _this.altViewInstances.find(function (vi) { return vi.uniqueId === viewInstance.uniqueId; });
                        if (foundViewInstance) {
                            _this.replaceViewInstance(foundViewInstance, viewInstance);
                        }
                        else {
                            _this.launchViewInstanceInNewTab(viewInstance);
                        }
                    }
                }
            }
        };
        this.launchViewInstanceInNewTab = function (viewInstance) {
            switch (viewInstance.paneType) {
                case 'nav':
                    _this.navViewInstances.push(viewInstance);
                    if (!_this.navActiveViewInstance) {
                        _this.navActiveViewInstance = viewInstance;
                    }
                    break;
                case 'main':
                    _this.mainViewInstances.push(viewInstance);
                    if (!_this.mainActiveViewInstance) {
                        _this.mainActiveViewInstance = viewInstance;
                    }
                    break;
                case 'alt':
                    _this.altViewInstances.push(viewInstance);
                    if (!_this.altActiveViewInstance) {
                        _this.altActiveViewInstance = viewInstance;
                    }
                    break;
                default:
                    break;
            }
            _this.focusViewInstance(viewInstance);
        };
        this.replaceViewInstance = function (oldViewInstance, newViewInstance) {
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
            _this.focusViewInstance(oldViewInstance);
        };
        this.started = this.start();
        this.started
            .then(function (stateDirectory) {
        })
            .catch(function (reason) {
            alert("error starting state plotter.\r\n" + reason);
        });
    }
    ShellService.prototype.start = function (baseUrl) {
        this.plotterShellModel = new lib_1.PlotterShellModel(this.fileManager);
        return this.plotterShellModel.start(baseUrl);
    };
    ShellService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [fileManager_1.FileManager])
    ], ShellService);
    return ShellService;
}());
exports.ShellService = ShellService;
//# sourceMappingURL=shell.service.js.map