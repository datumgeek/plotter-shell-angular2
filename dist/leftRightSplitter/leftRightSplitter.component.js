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
var LeftRightSplitterComponent = (function () {
    function LeftRightSplitterComponent(el) {
        this.el = el;
        this.leftWidth = 300;
        this.splitterWidth = 10;
        this.hideLeftContent = false;
        this.hideRightContent = false;
        this.originalX = 0;
        this.originalY = 0;
        this.originalLeftWidth = 300;
        this.prevLeftWidth = 300;
        this.isLeftWidthMax = false;
        this.inDrag = false;
    }
    LeftRightSplitterComponent.prototype.clickIt = function () {
        this.leftWidth += 20;
    };
    LeftRightSplitterComponent.prototype.ngOnChanges = function () {
        if (this.hideLeftContent) {
            this.prevLeftWidth = this.leftWidth;
            this.leftWidth = 0;
            this.splitterWidth = 0;
        }
        else {
            if (this.hideRightContent) {
                this.prevLeftWidth = this.leftWidth;
                this.leftWidth = (this.el.nativeElement).clientWidth;
                this.splitterWidth = 0;
            }
            else {
                this.leftWidth = this.prevLeftWidth;
                this.splitterWidth = 10;
            }
        }
    };
    LeftRightSplitterComponent.prototype.restore = function () {
        var restoreLeftWidth = this.prevLeftWidth;
        this.isLeftWidthMax = false;
        if (restoreLeftWidth < 0) {
            restoreLeftWidth = 0;
        }
        if (restoreLeftWidth >= (this.el.nativeElement).clientWidth - this.splitterWidth) {
            restoreLeftWidth = (this.el.nativeElement).clientWidth - this.splitterWidth;
            this.isLeftWidthMax = true;
        }
        this.leftWidth = restoreLeftWidth;
    };
    LeftRightSplitterComponent.prototype.collapseLeft = function () {
        this.leftWidth = 0;
        this.isLeftWidthMax = false;
    };
    LeftRightSplitterComponent.prototype.collapseRight = function () {
        this.leftWidth = (this.el.nativeElement).clientWidth - this.splitterWidth;
        this.isLeftWidthMax = true;
    };
    LeftRightSplitterComponent.prototype.onDragStart = function ($event) {
        if ($event.srcElement === this.splitterRef.element.nativeElement) {
            this.originalX = $event.x;
            this.originalY = $event.y;
            this.originalLeftWidth = this.leftWidth;
            this.inDrag = true;
        }
    };
    LeftRightSplitterComponent.prototype.onDragEnd = function ($event) {
        this.inDrag = false;
        if (this.leftWidth > 0 &&
            this.leftWidth < (this.el.nativeElement).clientWidth - this.splitterWidth) {
            this.prevLeftWidth = this.leftWidth;
        }
    };
    LeftRightSplitterComponent.prototype.onDrag = function ($event) {
        if (this.inDrag) {
            var newPaneWidth = this.originalLeftWidth + $event.x - this.originalX;
            this.isLeftWidthMax = false;
            if (newPaneWidth < 0) {
                newPaneWidth = 0;
            }
            if (newPaneWidth >= (this.el.nativeElement).clientWidth - this.splitterWidth) {
                newPaneWidth = (this.el.nativeElement).clientWidth - this.splitterWidth;
                this.isLeftWidthMax = true;
            }
            this.leftWidth = newPaneWidth;
        }
    };
    LeftRightSplitterComponent.prototype.onDragOver = function ($event) {
        $event.preventDefault();
    };
    __decorate([
        core_1.ViewChild("splitter", { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], LeftRightSplitterComponent.prototype, "splitterRef", void 0);
    __decorate([
        core_1.Input('left-width'), 
        __metadata('design:type', Number)
    ], LeftRightSplitterComponent.prototype, "leftWidth", void 0);
    __decorate([
        core_1.Input('splitter-width'), 
        __metadata('design:type', Number)
    ], LeftRightSplitterComponent.prototype, "splitterWidth", void 0);
    __decorate([
        core_1.Input('hide-left-content'), 
        __metadata('design:type', Boolean)
    ], LeftRightSplitterComponent.prototype, "hideLeftContent", void 0);
    __decorate([
        core_1.Input('hide-right-content'), 
        __metadata('design:type', Boolean)
    ], LeftRightSplitterComponent.prototype, "hideRightContent", void 0);
    LeftRightSplitterComponent = __decorate([
        core_1.Component({
            selector: 'p-left-right-splitter',
            host: {
                '(dragstart)': 'onDragStart($event)',
                '(dragend)': 'onDragEnd($event)',
                '(drag)': 'onDrag($event)'
            },
            template: "\n        <div left [style.width.px]=\"leftWidth\" droppable=\"true\" (dragover)=\"onDragOver($event)\">\n            <ng-content select=\"[left-pane]\"></ng-content>\n        </div>\n        <div #splitter splitter [style.width.px]=\"splitterWidth\" draggable=\"true\" (dragover)=\"onDragOver($event)\">\n            <i \n                class=\"button-collapse-left fa fa-arrow-circle-left\" \n                *ngIf=\"leftWidth > 0\" \n                (click)=\"collapseLeft()\"\n                [style.font-size.px]=\"splitterWidth + 2\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-left fa fa-minus-circle\"\n                *ngIf=\"leftWidth === 0\" \n                (click)=\"restore()\"\n                [style.font-size.px]=\"splitterWidth + 1\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-right fa fa-arrow-circle-right\"\n                *ngIf=\"!isLeftWidthMax\"\n                (click)=\"collapseRight()\"\n                [style.font-size.px]=\"splitterWidth + 2\" \n                aria-hidden=\"true\">\n            </i>\n            <i \n                class=\"button-collapse-right fa fa-minus-circle\"\n                *ngIf=\"isLeftWidthMax\"\n                (click)=\"restore()\"\n                [style.font-size.px]=\"splitterWidth + 1\" \n                aria-hidden=\"true\">\n            </i>\n        </div>\n        <div right (dragover)=\"$event\">\n            <ng-content select=\"[right-pane]\"></ng-content>\n        </div>\n    ",
            styles: ["\n        :host {\n            position: absolute;\n            left: 0;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            margin: 0;\n            padding: 0;\n            display: flex;\n            flex-direction: row;\n            flex 1 0 auto;\n            overflow: hidden;\n        }\n\n        :host [left] {\n            position: relative;\n            background-color: green;\n            flex: 0 0 auto;\n            width: 270px;\n            overflow: auto;\n        }\n\n        :host [splitter] {\n            position: relative;\n            background-color: silver;\n            flex: 0 0 auto;\n            width: 10px;\n        }\n\n        :host .button-collapse-right {\n            position: absolute;\n            top: 35px;\n            left: 0;\n        }\n\n        :host .button-collapse-left {\n            position: absolute;\n            top: 5px;\n            left: 0;\n        }\n\n        :host [right] {\n            position: relative;\n            background-color: blue;\n            flex: 1 1 auto;\n            overflow:auto;\n        }\n\n        :host ng-content {\n            position: absolute;\n            left: 0;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            margin: 0;\n            padding: 0;\n            overflow: scroll;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LeftRightSplitterComponent);
    return LeftRightSplitterComponent;
}());
exports.LeftRightSplitterComponent = LeftRightSplitterComponent;
//# sourceMappingURL=leftRightSplitter.component.js.map