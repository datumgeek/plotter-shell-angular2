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
var HostChooserComponent = (function () {
    function HostChooserComponent(shellService, router) {
        var _this = this;
        this.shellService = shellService;
        this.router = router;
        shellService.started
            .then(function (stateDirectory) {
            if (stateDirectory
                && stateDirectory.stateRepositories
                && stateDirectory.stateRepositories.length > 0) {
                _this.selectedStateRepository = stateDirectory.stateRepositories[0];
            }
        });
    }
    HostChooserComponent.prototype.choose = function (stateRepository) {
        this.router.navigate(['/sessions', { stateRepositoryId: stateRepository.uniqueId }]);
    };
    HostChooserComponent.prototype.enterPressed = function ($event) {
        if ($event.key === 'Enter') {
            this.choose(this.selectedStateRepository);
        }
    };
    HostChooserComponent.prototype.selectInserted = function ($event) {
        if ($event.relatedNode.nodeName === 'SELECT') {
            $event.relatedNode.focus();
        }
    };
    HostChooserComponent = __decorate([
        core_1.Component({
            selector: 'p-host-chooser',
            host: { '(window:keydown)': 'enterPressed($event)', '(body:DOMNodeInserted)': 'selectInserted($event)' },
            template: "\n        <div class=\"heading\">\n\n            <h1 class=\"h1\">Plotter Host</h1>\n            <h3>Choose Plotter Host:</h3>\n\n            <div class=\"input-group input-group-lg\"\n                *ngIf=\"shellService.plotterShellModel && shellService.plotterShellModel.stateDirectory\">\n\n                <select class=\"form-control\"\n                    [(ngModel)]=\"selectedStateRepository\">\n\n                    <option \n                        *ngFor=\"let stateRepo of shellService.plotterShellModel.stateDirectory.stateRepositories\" \n                        [ngValue]=\"stateRepo\">\n                        \n                        {{ stateRepo.uniqueId }} ({{ stateRepo.stateRepositoryType.toLowerCase() }}:{{ stateRepo.path }})\n                    </option>\n                    \n                </select>\n\n                <span class=\"input-group-addon\" (click)=\"choose(selectedStateRepository)\">\n                    <i class=\"fa fa-arrow-circle-right fa-lg\"></i>\n                </span>\n\n            </div>\n        </div>\n        <div class=\"body\">\n        </div>\n    ",
            styles: [
                "\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n        }\n\n        .heading {\n            background-color: mediumaquamarine;\n            padding: 10px;\n        }\n\n        .body {\n            background-color: darkcyan;\n            flex: 1 1 auto;\n            padding: 10px;\n        }\n        "
            ]
        }), 
        __metadata('design:paramtypes', [shell_service_1.ShellService, router_1.Router])
    ], HostChooserComponent);
    return HostChooserComponent;
}());
exports.HostChooserComponent = HostChooserComponent;
//# sourceMappingURL=hostChooser.component.js.map