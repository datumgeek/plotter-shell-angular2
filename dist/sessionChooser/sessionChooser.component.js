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
var SessionChooserComponent = (function () {
    function SessionChooserComponent(shellService, router, activatedRoute) {
        this.shellService = shellService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    SessionChooserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.stateRepositoryId = params['stateRepositoryId'];
            _this.stateRepository = _this.shellService.plotterShellModel.stateDirectory.getStateRepository(_this.stateRepositoryId);
            if (_this.stateRepository) {
                _this.stateRepository.getSessionList()
                    .then(function (sessionList) {
                    _this.sessionIdList = sessionList;
                    if (_this.sessionIdList.length > 0) {
                        _this.selectedSessionId = _this.sessionIdList[0];
                    }
                });
            }
            if (!_this.stateRepositoryId) {
                alert("missing state repository parameter.");
            }
            if (!_this.stateRepository) {
                alert("no matching state repository for uniqueId: " + _this.stateRepositoryId);
            }
        });
    };
    SessionChooserComponent.prototype.choose = function (selectedSessionId) {
        if (selectedSessionId) {
            this.router.navigate(['/shell', { stateRepositoryId: this.stateRepositoryId, sessionId: selectedSessionId }]);
        }
        else {
            this.router.navigate(['/new-session', { stateRepositoryId: this.stateRepositoryId }]);
        }
    };
    SessionChooserComponent.prototype.keydown = function ($event) {
        if ($event.key === 'Enter') {
            this.choose(this.selectedSessionId);
        }
    };
    SessionChooserComponent.prototype.selectInserted = function ($event) {
        if ($event.relatedNode.nodeName === 'SELECT') {
            $event.relatedNode.focus();
        }
    };
    SessionChooserComponent = __decorate([
        core_1.Component({
            selector: 'p-session-chooser',
            host: { '(window:keydown)': 'keydown($event)', '(body:DOMNodeInserted)': 'selectInserted($event)' },
            template: "\n        <div class=\"heading\">\n\n            <h1 class=\"h1\">Session Chooser</h1>\n            <h3>Choose a Session:</h3>\n\n            <div class=\"input-group input-group-lg\"\n                *ngIf=\"sessionIdList\">\n\n                <select class=\"form-control\"\n                    [(ngModel)]=\"selectedSessionId\">\n\n                    <option value=\"\">(new session)</option>\n\n                    <option\n                        *ngFor=\"let sessionId of sessionIdList\" \n                        [ngValue]=\"sessionId\">\n\n                        {{ sessionId }}\n                    </option>\n                    \n                </select>\n\n                <span class=\"input-group-addon\" (click)=\"choose(selectedSessionId)\">\n                    <i class=\"fa fa-arrow-circle-right fa-lg\"></i>\n                </span>\n\n            </div>\n        </div>\n        <div class=\"body\">\n        </div>\n    ",
            styles: [
                "\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n        }\n\n        .heading {\n            background-color: mediumaquamarine;\n            padding: 10px;\n        }\n\n        .body {\n            background-color: darkcyan;\n            flex: 1 1 auto;\n            padding: 10px;\n        }\n        "
            ]
        }), 
        __metadata('design:paramtypes', [shell_service_1.ShellService, router_1.Router, router_1.ActivatedRoute])
    ], SessionChooserComponent);
    return SessionChooserComponent;
}());
exports.SessionChooserComponent = SessionChooserComponent;
//# sourceMappingURL=sessionChooser.component.js.map