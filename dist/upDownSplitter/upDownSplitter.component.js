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
var UpDownSplitterComponent = (function () {
    function UpDownSplitterComponent(el) {
        this.el = el;
        this.upHeight = 300;
        this.splitterHeight = 12;
        this.hideUpContent = false;
        this.hideDownContent = false;
        this.originalX = 0;
        this.originalY = 0;
        this.originalUpHeight = 300;
        this.prevUpHeight = 300;
        this.isUpHeightMax = false;
        this.inDrag = false;
    }
    UpDownSplitterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.upHeight) {
            var newHeight = changes.upHeight.currentValue;
            if (newHeight) {
                this.upHeight = newHeight;
                this.prevUpHeight = newHeight;
            }
        }
        var newPaneHeight = this.upHeight;
        if (newPaneHeight < 0) {
            newPaneHeight = 0;
        }
        if (newPaneHeight > (this.el.nativeElement).clientHeight - this.splitterHeight) {
            newPaneHeight = (this.el.nativeElement).clientHeight - this.splitterHeight;
        }
        this.upHeight = newPaneHeight;
        if (this.hideUpContent) {
            this.prevUpHeight = this.upHeight;
            this.upHeight = 0;
            this.splitterHeight = 0;
        }
        else {
            if (this.hideDownContent) {
                this.prevUpHeight = this.upHeight;
                this.upHeight = (this.el.nativeElement).clientHeight;
                this.splitterHeight = 0;
            }
            else {
                this.upHeight = this.prevUpHeight;
                this.splitterHeight = 12;
            }
        }
    };
    UpDownSplitterComponent.prototype.restore = function () {
        var restoreUpHeight = this.prevUpHeight;
        this.isUpHeightMax = false;
        if (restoreUpHeight < 0) {
            restoreUpHeight = 0;
        }
        if (restoreUpHeight >= (this.el.nativeElement).clientHeight - this.splitterHeight) {
            restoreUpHeight = (this.el.nativeElement).clientHeight - this.splitterHeight;
            this.isUpHeightMax = true;
        }
        this.upHeight = restoreUpHeight;
    };
    UpDownSplitterComponent.prototype.collapseUp = function () {
        this.upHeight = 0;
        this.isUpHeightMax = false;
    };
    UpDownSplitterComponent.prototype.collapseDown = function () {
        this.upHeight = (this.el.nativeElement).clientHeight - this.splitterHeight;
        this.isUpHeightMax = true;
    };
    UpDownSplitterComponent.prototype.onDragStart = function ($event) {
        if ($event.srcElement === this.splitterRef.element.nativeElement) {
            this.originalX = $event.x;
            this.originalY = $event.y;
            this.originalUpHeight = this.upHeight;
            this.inDrag = true;
        }
    };
    UpDownSplitterComponent.prototype.onDragEnd = function ($event) {
        this.inDrag = false;
        if (this.upHeight > 0 &&
            this.upHeight < (this.el.nativeElement).clientHeight - this.splitterHeight) {
            this.prevUpHeight = this.upHeight;
        }
    };
    UpDownSplitterComponent.prototype.onDrag = function ($event) {
        if (this.inDrag) {
            var newPaneHeight = this.originalUpHeight + $event.y - this.originalY;
            this.isUpHeightMax = false;
            if (newPaneHeight < 0) {
                newPaneHeight = 0;
            }
            if (newPaneHeight > (this.el.nativeElement).clientHeight - this.splitterHeight) {
                newPaneHeight = (this.el.nativeElement).clientHeight - this.splitterHeight;
                this.isUpHeightMax = true;
            }
            this.upHeight = newPaneHeight;
        }
    };
    UpDownSplitterComponent.prototype.onDragOver = function ($event) {
        $event.preventDefault();
    };
    __decorate([
        core_1.ViewChild("splitter", { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], UpDownSplitterComponent.prototype, "splitterRef", void 0);
    __decorate([
        core_1.Input('up-height'), 
        __metadata('design:type', Number)
    ], UpDownSplitterComponent.prototype, "upHeight", void 0);
    __decorate([
        core_1.Input('splitter-height'), 
        __metadata('design:type', Number)
    ], UpDownSplitterComponent.prototype, "splitterHeight", void 0);
    __decorate([
        core_1.Input('hide-up-content'), 
        __metadata('design:type', Boolean)
    ], UpDownSplitterComponent.prototype, "hideUpContent", void 0);
    __decorate([
        core_1.Input('hide-down-content'), 
        __metadata('design:type', Boolean)
    ], UpDownSplitterComponent.prototype, "hideDownContent", void 0);
    UpDownSplitterComponent = __decorate([
        core_1.Component({
            selector: 'p-up-down-splitter',
            host: {
                '(dragstart)': 'onDragStart($event)',
                '(dragend)': 'onDragEnd($event)',
                '(drag)': 'onDrag($event)'
            },
            template: "\n        <div up [style.height.px]=\"upHeight\" droppable=\"true\" (dragover)=\"onDragOver($event)\">\n            <ng-content select=\"[up-pane]\"></ng-content>\n        </div>\n        <div #splitter splitter [style.height.px]=\"splitterHeight\" draggable=\"true\" (dragover)=\"onDragOver($event)\">\n            <i \n                class=\"button-collapse-up fa fa-arrow-circle-up\" \n                *ngIf=\"upHeight > 0\" \n                (click)=\"collapseUp()\"\n                [style.font-size.px]=\"splitterHeight + 2\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-up fa fa-minus-circle\"\n                *ngIf=\"upHeight === 0\" \n                (click)=\"restore()\"\n                [style.font-size.px]=\"splitterHeight + 2\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-down fa fa-arrow-circle-down\"\n                *ngIf=\"!isUpHeightMax\" \n                (click)=\"collapseDown()\"\n                [style.font-size.px]=\"splitterHeight + 2\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-down fa fa-minus-circle\"\n                *ngIf=\"isUpHeightMax\" \n                (click)=\"restore()\"\n                [style.font-size.px]=\"splitterHeight + 1\" \n                aria-hidden=\"true\">\n            </i>\n        </div>\n        <div down (dragover)=\"$event\">\n            <ng-content select=\"[down-pane]\"></ng-content>\n        </div>\n    ",
            styles: ["\n        :host {\n            position: absolute;\n            left: 0;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            margin: 0;\n            padding: 0;\n            display: flex;\n            flex-direction: column;\n            flex 1 0 auto;\n            overflow: hidden;\n        }\n\n        :host [up] {\n            position: relative;\n            overflow: hidden;\n            background-color: white;\n        }\n\n        :host [splitter] {\n            position: relative;\n            background-color: silver;\n            flex: 0 0 auto;\n            height: 17px;\n        }\n\n        :host .button-collapse-down {\n            position: absolute;\n            top: 0;\n            left: 35px;\n        }\n\n        :host .button-collapse-up {\n            position: absolute;\n            top: 0;\n            left: 5px;\n        }\n\n        :host [down] {\n            position: relative;\n            background-color: white;\n            flex: 1 1 auto;\n        }\n\n        :host ng-content {\n            position: absolute;\n            left: 0;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            margin: 0;\n            padding: 0;\n            overflow: scroll;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], UpDownSplitterComponent);
    return UpDownSplitterComponent;
}());
exports.UpDownSplitterComponent = UpDownSplitterComponent;
//# sourceMappingURL=upDownSplitter.component.js.map