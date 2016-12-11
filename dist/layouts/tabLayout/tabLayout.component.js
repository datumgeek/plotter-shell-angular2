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
var TabLayoutComponent = (function () {
    function TabLayoutComponent() {
        this.pParentVisible = true;
    }
    TabLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.children.forEach(function (child) {
            child.pParentVisible = _this.pParentVisible;
        });
    };
    TabLayoutComponent.prototype.ngOnChanges = function (changes) {
        var changesProp = changes;
        if (changesProp.pParentVisible) {
            if (this.children) {
                this.children.forEach(function (child) {
                    child.pParentVisible = changes['pParentVisible'].currentValue;
                });
            }
        }
    };
    TabLayoutComponent.prototype.ngOnInit = function () {
        if (this.state.layout.tabs && this.state.layout.tabs.length > 0) {
            this.state.layout.activeTab = this.state.layout.tabs[0];
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabLayoutComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input('p-parent-visible'), 
        __metadata('design:type', Boolean)
    ], TabLayoutComponent.prototype, "pParentVisible", void 0);
    __decorate([
        core_1.ViewChildren(TabLayoutComponent), 
        __metadata('design:type', Array)
    ], TabLayoutComponent.prototype, "children", void 0);
    TabLayoutComponent = __decorate([
        core_1.Component({
            selector: 'p-tab-layout',
            template: "\n        <p-up-down-splitter \n            [hide-up-content]=\"!state.layout.title && !state.layout.header\" \n            [hide-down-content]=\"!state.layout.tabs || state.layout.tabs.length <= 0\" \n            [up-height]=\"state.layout.header?.upHeight\"\n            class=\"up-down-splitter\">\n\n            <div up-pane class=\"up-pane\" *ngIf=\"state.layout.title || state.layout.header\">\n                <p-compose\n                    *ngIf=\"state.layout.header\"\n                    [cmodule]=\"state.layout.header.cmodule\"\n                    [component]=\"state.layout.header.component\"\n                    [state]=\"state.layout.header.state\"\n                    [p-parent-visible]=\"pParentVisible\">\n                </p-compose>\n            </div>\n\n            <div down-pane class=\"down-pane\" *ngIf=\"state.layout.tabs && state.layout.tabs.length > 0\">\n\n                <div *ngIf=\"false\" class=\"btn-group main-tabs\" data-toggle=\"buttons\">\n                    <label *ngFor=\"let tab of state.layout.tabs; let ii = index\" class=\"btn btn-primary {{tab === state.layout.activeTab ? 'active' : ''}}\">\n                        <input type=\"radio\" name=\"mainTabs\" [ngModel]=\"tab\" (click)=\"state.layout.activeTab = tab\" [checked]=\"state.layout.activeTab === tab\">\n                        <span>{{tab.title}}</span>\n                    </label>\n                </div>\n\n                <ul class=\"nav nav-tabs main-tabs\">\n                    <li \n                        *ngFor=\"let tab of state.layout.tabs; let ii = index\" \n                        class=\"{{tab === state.layout.activeTab ? 'active' : ''}}\"\n                        (click)=\"state.layout.activeTab = tab\">\n                        {{tab.title}}\n                    </li>\n                </ul>\n\n                <div class=\"main-body\">\n                    <div class=\"main-host\">\n                        <p-tab-layout\n                            *ngFor=\"let tab of state.layout.tabs\"\n                            [state]=\"{ layout: tab }\"\n                            [style.visibility]=\"tab === state.layout.activeTab && pParentVisible ? 'visible' : 'hidden'\">\n                            [p-parent-visible]=\"pParentVisible\"\n                        </p-tab-layout>\n                    </div>\n                </div>\n\n            </div>\n\n        </p-up-down-splitter>\n\n        ",
            styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            background-color: white;\n            margin: 5px;\n            padding: 0;\n            flex: 1 0 auto;\n            overflow: hidden;\n        }\n\n        :host .down-pane {\n            display: flex;\n            flex-direction: column;\n            background-color: white;\n            position: absolute;\n            margin: 5px;\n            padding: 0;\n            border: 0;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n        }\n\n        :host .main-tabs {\n            margin-top: 10px;\n            border-bottom: solid 2px #ddd;\n        }\n\n        :host .main-tabs > li {\n            margin-left:5px;\n            padding: 3px;\n            margin-bottom: 0;\n            background-color: white;\n        }\n\n        :host .main-tabs > li.active {\n            margin-bottom: -2px;\n            border-left: solid 2px #ddd;\n            border-top: solid 2px #ddd;\n            border-right: solid 2px #ddd;\n        }\n\n        :host .main-body {\n            flex: 1 0 auto;\n            position: relative;\n            border-left: solid 2px #ddd;\n            border-bottom: solid 2px #ddd;\n            border-right: solid 2px #ddd;\n        }\n\n        :host .main-host {\n            position: absolute;\n            left: 0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            margin: 5px;\n            padding: 0;\n            overflow: hidden;\n        }\n        \n        :host p-tab-layout {\n            position: absolute;\n            left: 0;\n            right: 0;\n            top: 0;\n            bottom: 0;\n            margin: 5px;\n            padding: 0;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], TabLayoutComponent);
    return TabLayoutComponent;
}());
exports.TabLayoutComponent = TabLayoutComponent;
//# sourceMappingURL=tabLayout.component.js.map