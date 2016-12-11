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
var PageLayoutComponent = (function () {
    function PageLayoutComponent() {
    }
    PageLayoutComponent = __decorate([
        core_1.Component({
            selector: 'p-page-layout',
            template: "\n        <div *ngIf=\"state.layout.title\">{{ state.layout.title }}</div>\n\n        <p-compose\n            *ngIf=\"state.layout.header\"\n            [cmodule]=\"state.layout.header.cmodule\"\n            [component]=\"state.layout.component\"\n            [state]=\"state.layout.header.state\">\n        </p-compose>\n\n        <template *ngIf=\"state.layout.tabs\">\n            <div class=\"btn-group\" data-toggle=\"buttons\">\n                <label *ngFor=\"let vi of viewInstances; let ii = index\" class=\"btn btn-primary {{vi === activeViewInstance ? 'active' : ''}}\">\n                    <input type=\"radio\" name=\"vi\" [ngModel]=\"vi\" (click)=\"setFocus(vi)\" [checked]=\"activeViewInstance === vi\">\n                    <i class=\"fa fa-plug\"></i>\n                    <span *ngIf=\"showTitle\">{{vi.title}}</span>\n                    <i *ngIf=\"isUp && showArrow\" class=\"fa fa-arrow-circle-up\" (click)=\"moveItem(vi, ii, viewInstances)\"></i>\n                    <i *ngIf=\"!isUp && showArrow\" class=\"fa fa-arrow-circle-down\" (click)=\"moveItem(vi, ii, viewInstances)\"></i>\n                    <i *ngIf=\"!vi.hideClose\" class=\"fa fa-times\" (click)=\"removeItem(vi, ii, viewInstances)\"></i>\n                </label>\n            </div>\n\n        </template>\n        ",
            styles: [""]
        }), 
        __metadata('design:paramtypes', [])
    ], PageLayoutComponent);
    return PageLayoutComponent;
}());
exports.PageLayoutComponent = PageLayoutComponent;
//# sourceMappingURL=pageLayout.component.js.map