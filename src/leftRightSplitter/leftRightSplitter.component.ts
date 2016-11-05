import { Component, ElementRef, ViewChild, ViewContainerRef, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'p-left-right-splitter',
    host: {
        '(dragstart)': 'onDragStart($event)',
        '(dragend)': 'onDragEnd($event)',
        '(drag)': 'onDrag($event)'
    },
    template: `
        <div left [style.width.px]="leftWidth" droppable="true" (dragover)="onDragOver($event)">
            <ng-content select="[left-pane]"></ng-content>
        </div>
        <div #splitter splitter [style.width.px]="splitterWidth" draggable="true" (dragover)="onDragOver($event)">
            <i 
                class="button-collapse-left fa fa-arrow-circle-left" 
                *ngIf="leftWidth > 0" 
                (click)="collapseLeft()"
                [style.font-size.px]="splitterWidth + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-left fa fa-minus-circle"
                *ngIf="leftWidth === 0" 
                (click)="restore()"
                [style.font-size.px]="splitterWidth + 1" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-right fa fa-arrow-circle-right"
                *ngIf="!isLeftWidthMax"
                (click)="collapseRight()"
                [style.font-size.px]="splitterWidth + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-right fa fa-minus-circle"
                *ngIf="isLeftWidthMax"
                (click)="restore()"
                [style.font-size.px]="splitterWidth + 1" 
                aria-hidden="true">
            </i>
        </div>
        <div right (dragover)="$event">
            <ng-content select="[right-pane]"></ng-content>
        </div>
    `,
    styles: [`
        :host {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex 1 0 auto;
            overflow: hidden;
        }

        :host [left] {
            position: relative;
            background-color: green;
            flex: 0 0 auto;
            width: 270px;
            overflow: auto;
        }

        :host [splitter] {
            position: relative;
            background-color: silver;
            flex: 0 0 auto;
            width: 10px;
        }

        :host .button-collapse-right {
            position: absolute;
            top: 35px;
            left: 0;
        }

        :host .button-collapse-left {
            position: absolute;
            top: 5px;
            left: 0;
        }

        :host [right] {
            position: relative;
            background-color: blue;
            flex: 1 1 auto;
            overflow:auto;
        }

        :host ng-content {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            padding: 0;
            overflow: scroll;
        }
    `]
})
export class LeftRightSplitterComponent implements OnChanges {

    @ViewChild("splitter", { read: ViewContainerRef }) splitterRef: ViewContainerRef;

    @Input('left-width') leftWidth: number = 300;
    @Input('splitter-width') splitterWidth: number = 10;

    @Input('hide-left-content') hideLeftContent: boolean = false;
    @Input('hide-right-content') hideRightContent: boolean = false;

    private originalX: number = 0;
    private originalY: number = 0;
    private originalLeftWidth: number = 300;
    private prevLeftWidth: number = 300;
    private isLeftWidthMax = false;
    private inDrag: boolean = false;

    constructor(private el: ElementRef) {}
    clickIt() { 
        this.leftWidth += 20;
    }

    ngOnChanges() {
        if (this.hideLeftContent) {
            this.prevLeftWidth = this.leftWidth;
            this.leftWidth = 0;
            this.splitterWidth = 0;
        } else {
            if (this.hideRightContent) {
                this.prevLeftWidth = this.leftWidth;
                this.leftWidth = (<HTMLElement>(this.el.nativeElement)).clientWidth;
                this.splitterWidth = 0;
            } else {
                this.leftWidth = this.prevLeftWidth;
                this.splitterWidth = 10;
            }
        }
    }

    restore() {
        let restoreLeftWidth = this.prevLeftWidth;
        this.isLeftWidthMax = false;

        if (restoreLeftWidth < 0) {
            restoreLeftWidth = 0;
        }
        if (restoreLeftWidth >= (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth) {
            restoreLeftWidth = (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth;
            this.isLeftWidthMax = true;
        }

        this.leftWidth = restoreLeftWidth;
    }

    collapseLeft() {
        this.leftWidth = 0;
        this.isLeftWidthMax = false;
    }

    collapseRight() {
        this.leftWidth = (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth;
        this.isLeftWidthMax = true;
    }

    onDragStart($event: DragEvent) {
        if ($event.srcElement === this.splitterRef.element.nativeElement) {
            this.originalX = $event.x;
            this.originalY = $event.y;
            this.originalLeftWidth = this.leftWidth;
            this.inDrag = true;
        }
    }

    onDragEnd($event: DragEvent) {
        this.inDrag = false;

        if (this.leftWidth > 0 &&
            this.leftWidth < (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth) {
                this.prevLeftWidth = this.leftWidth;
            }
    }

    onDrag($event: DragEvent) {
        if (this.inDrag) {
            let newPaneWidth = this.originalLeftWidth + $event.x - this.originalX;
            this.isLeftWidthMax = false;

            if (newPaneWidth < 0) {
                newPaneWidth = 0;
            }

            if (newPaneWidth >= (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth) {
                newPaneWidth = (<HTMLElement>(this.el.nativeElement)).clientWidth - this.splitterWidth;
                this.isLeftWidthMax = true;
            }
            this.leftWidth = newPaneWidth;
        }
    }

    onDragOver($event: DragEvent) {
        $event.preventDefault();
    }
}