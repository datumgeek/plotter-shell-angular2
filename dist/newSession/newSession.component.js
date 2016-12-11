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
var NewSessionComponent = (function () {
    function NewSessionComponent(shellService, activatedRoute, router) {
        this.shellService = shellService;
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    NewSessionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.stateRepositoryId = params['stateRepositoryId'];
            _this.stateRepository = _this.shellService.plotterShellModel.stateDirectory.getStateRepository(_this.stateRepositoryId);
            _this.stateRepository.getPakDirectory()
                .then(function (pakDirectory) {
                _this.pakDirectory = pakDirectory;
                _this.pakDirectory.pakRepositories.forEach(function (pakRepo) {
                    pakRepo.getPakList();
                });
            });
        });
    };
    NewSessionComponent = __decorate([
        core_1.Component({
            selector: 'p-new-session',
            template: "\n    <div class=\"header\">\n        <h1>New Session on {{stateRepositoryId}}</h1>\n    </div>\n    <div class=\"body\">\n        <template [ngIf]=\"pakDirectory\">\n            <div *ngFor=\"let pakRepo of pakDirectory.pakRepositories\">\n                <h3>{{pakRepo.uniqueId}}</h3>\n                <template [ngIf]=\"pakRepo && pakRepo.pakList\">\n                    <p *ngFor=\"let pakId of pakRepo.pakList\">&nbsp;&nbsp;&nbsp;&nbsp;<label><input type=\"checkbox\" [value]=\"pakId\"> {{pakId}}</label></p>\n                </template>\n            </div>\n        </template>\n    </div>\n    ",
            styles: [
                "\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n        }\n\n        .header {\n            background-color: mediumaquamarine;\n            padding: 10px;\n        }\n        .body {\n            flex: 1 1;\n            padding: 10px;\n            background-color: darkcyan;\n        }\n        "
            ]
        }), 
        __metadata('design:paramtypes', [shell_service_1.ShellService, router_1.ActivatedRoute, router_1.Router])
    ], NewSessionComponent);
    return NewSessionComponent;
}());
exports.NewSessionComponent = NewSessionComponent;
//# sourceMappingURL=newSession.component.js.map