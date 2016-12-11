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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var FileManager = (function () {
    function FileManager(http) {
        this.http = http;
        this.homePath = '';
        var plotterPaths = window.plotterPaths;
        if (plotterPaths && plotterPaths.home) {
            this.homePath = plotterPaths.home;
            if (!this.homePath.endsWith('/')) {
                this.homePath = this.homePath + "/";
            }
        }
    }
    FileManager.prototype.get = function (segments) {
        var _this = this;
        var that = this;
        return new Promise(function (resolve, reject) {
            that.http.get("" + _this.homePath + segments.join('/'))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(new Error("fetch pak-directory failed: reason: \r\n\r\n" + err));
            });
        });
    };
    FileManager.prototype.set = function (segments, content) {
        return new Promise(function (resolve, reject) {
            reject("FileManager 'set' not implemented.");
        });
    };
    FileManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FileManager);
    return FileManager;
}());
exports.FileManager = FileManager;
//# sourceMappingURL=fileManager.js.map