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
var router_1 = require('@angular/router');
var shell_service_1 = require('../shell.service');
var parameter_service_1 = require('../parameter.service');
var ShellComponent = (function () {
    function ShellComponent(router, activatedRoute, shellService, parameterService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.shellService = shellService;
        this.parameterService = parameterService;
        this.views = [];
        this.viewInstancesLoadedPromise = new Promise(function (resolve, reject) {
            _this.viewInstancesLoadedResolve = resolve;
            _this.viewInstancesLoadedReject = reject;
        });
    }
    ShellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            // parameters are used by startShell
            _this.stateRepositoryId = params['stateRepositoryId'];
            _this.sessionId = params['sessionId'];
            _this.parameterService.load(params);
            _this.startShell()
                .then(function () {
                _this.loadViewInstances();
            });
        });
    };
    ShellComponent.prototype.loadViewInstances = function () {
        var _this = this;
        this.stateSession.activePaks.forEach(function (activePak) {
            activePak.viewInstances.forEach(function (viewInstance) {
                _this.shellService.launchViewInstance(viewInstance, false);
            });
        });
        this.viewInstancesLoadedResolve(true);
    };
    ShellComponent.prototype.startShell = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.shellService.plotterShellModel.started
                .then(function (stateDirectory) {
                _this.stateRepository = _this.shellService.plotterShellModel.stateDirectory.getStateRepository(_this.stateRepositoryId);
                if (_this.stateRepository) {
                    _this.stateRepository.getSessionList()
                        .then(function (sessionList) {
                        _this.sessionIdList = sessionList;
                    }).catch(function (err) {
                        reject("error getting session list. \r\n " + err);
                    });
                    _this.stateRepository.getStateSession(_this.sessionId)
                        .then(function (stateSession) {
                        // shell is now started with supplied session
                        _this.stateSession = stateSession;
                        resolve(true);
                    }).catch(function (err) {
                        reject("error getting session list. \r\n " + err);
                    });
                }
                if (!_this.stateRepositoryId) {
                    reject("missing state repository parameter.");
                }
                if (!_this.stateRepository) {
                    reject("no matching state repository for uniqueId: " + _this.stateRepositoryId);
                }
                if (!_this.sessionId) {
                    reject("missing session id.");
                }
            });
        });
    };
    ShellComponent = __decorate([
        core_1.Component({
            selector: 'p-shell',
            template: require('./shell.component.html'),
            styles: [require('./shell.component.less')]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, shell_service_1.ShellService, parameter_service_1.ParameterService])
    ], ShellComponent);
    return ShellComponent;
}());
exports.ShellComponent = ShellComponent;
//# sourceMappingURL=shell.component.js.map