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
var pubSubCustomSubject_1 = require('./pubSubCustomSubject');
var Rx_1 = require('rxjs/Rx');
exports.Subscription = Rx_1.Subscription;
var PubSubEventBus = (function () {
    function PubSubEventBus() {
        var _this = this;
        this.subjects = [];
        this.publish = function (subjectName, value) {
            var subject = _this.subjects[subjectName];
            if (subject) {
                subject.next(value);
            }
        };
        this.subscribe = function (subjectName, f, error, complete) {
            var subject = _this.subjects[subjectName];
            if (!subject) {
                _this.subjects[subjectName] = subject = new pubSubCustomSubject_1.PubSubCustomSubject();
            }
            return subject.subscribe(f, error, complete);
        };
    }
    PubSubEventBus = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PubSubEventBus);
    return PubSubEventBus;
}());
exports.PubSubEventBus = PubSubEventBus;
//# sourceMappingURL=pubSubEventBus.js.map