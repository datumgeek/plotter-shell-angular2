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
var router_1 = require('@angular/router');
var shell_component_1 = require('./shell/shell.component');
var hostChooser_component_1 = require('./hostChooser/hostChooser.component');
var sessionChooser_component_1 = require('./sessionChooser/sessionChooser.component');
var newSession_component_1 = require('./newSession/newSession.component');
var compose_component_1 = require('./compose/compose.component');
var shellToolbar_component_1 = require('./shellToolbar/shellToolbar.component');
var leftRightSplitter_component_1 = require('./leftRightSplitter/leftRightSplitter.component');
var upDownSplitter_component_1 = require('./upDownSplitter/upDownSplitter.component');
var tabLayout_component_1 = require('./layouts/tabLayout/tabLayout.component');
var pageLayout_component_1 = require('./layouts/pageLayout/pageLayout.component');
var routes = [
    { path: '', component: hostChooser_component_1.HostChooserComponent },
    { path: 'sessions', component: sessionChooser_component_1.SessionChooserComponent },
    { path: 'new-session', component: newSession_component_1.NewSessionComponent },
    { path: 'shell', component: shell_component_1.ShellComponent }
];
var ShellModule = (function () {
    function ShellModule() {
    }
    ShellModule = __decorate([
        core_1.NgModule({
            declarations: [
                shell_component_1.ShellComponent,
                compose_component_1.ComposeComponent,
                hostChooser_component_1.HostChooserComponent,
                sessionChooser_component_1.SessionChooserComponent,
                newSession_component_1.NewSessionComponent,
                shellToolbar_component_1.ShellToolbarComponent,
                leftRightSplitter_component_1.LeftRightSplitterComponent,
                upDownSplitter_component_1.UpDownSplitterComponent,
                tabLayout_component_1.TabLayoutComponent,
                pageLayout_component_1.PageLayoutComponent
            ],
            imports: [
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [],
            exports: [
                shell_component_1.ShellComponent,
                compose_component_1.ComposeComponent,
                hostChooser_component_1.HostChooserComponent,
                sessionChooser_component_1.SessionChooserComponent,
                newSession_component_1.NewSessionComponent,
                shellToolbar_component_1.ShellToolbarComponent,
                leftRightSplitter_component_1.LeftRightSplitterComponent,
                upDownSplitter_component_1.UpDownSplitterComponent,
                tabLayout_component_1.TabLayoutComponent,
                pageLayout_component_1.PageLayoutComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ShellModule);
    return ShellModule;
}());
exports.ShellModule = ShellModule;
//# sourceMappingURL=shell.module.js.map