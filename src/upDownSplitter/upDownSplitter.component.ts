import { Component, ElementRef, Input, OnChanges, ViewChild, ViewContainerRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'p-up-down-splitter',
    host: {
        '(dragstart)': 'onDragStart($event)',
        '(dragend)': 'onDragEnd($event)',
        '(drag)': 'onDrag($event)'
    },
    template: `
        <div up [style.height.px]="upHeight" droppable="true" (dragover)="onDragOver($event)">
            <ng-content select="[up-pane]"></ng-content>
        </div>
        <div #splitter splitter [style.height.px]="splitterHeight" draggable="true" (dragover)="onDragOver($event)">
            <i 
                class="button-collapse-up fa fa-arrow-circle-up" 
                *ngIf="upHeight > 0" 
                (click)="collapseUp()"
                [style.font-size.px]="splitterHeight + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-up fa fa-minus-circle"
                *ngIf="upHeight === 0" 
                (click)="restore()"
                [style.font-size.px]="splitterHeight + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-down fa fa-arrow-circle-down"
                *ngIf="!isUpHeightMax" 
                (click)="collapseDown()"
                [style.font-size.px]="splitterHeight + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-down fa fa-minus-circle"
                *ngIf="isUpHeightMax" 
                (click)="restore()"
                [style.font-size.px]="splitterHeight + 1" 
                aria-hidden="true">
            </i>
        </div>
        <div down (dragover)="$event">
            <ng-content select="[down-pane]"></ng-content>
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
            flex-direction: column;
            flex 1 0 auto;
            overflow: hidden;
        }

        :host [up] {
            position: relative;
            overflow: hidden;
            background-color: white;
        }

        :host [splitter] {
            position: relative;
            background-color: silver;
            flex: 0 0 auto;
            height: 17px;
        }

        :host .button-collapse-down {
            position: absolute;
            top: 0;
            left: 35px;
        }

        :host .button-collapse-up {
            position: absolute;
            top: 0;
            left: 5px;
        }

        :host [down] {
            position: relative;
            background-color: white;
            flex: 1 1 auto;
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
export class UpDownSplitterComponent implements OnChanges {

    @ViewChild("splitter", { read: ViewContainerRef }) splitterRef: ViewContainerRef;

    @Input('up-height') upHeight: number = 300;
    @Input('splitter-height') splitterHeight: number = 12;

    @Input('hide-up-content') hideUpContent: boolean = false;
    @Input('hide-down-content') hideDownContent: boolean = false;

    private originalX: number = 0;
    private originalY: number = 0;
    private originalUpHeight: number = 300;
    private prevUpHeight: number = 300;
    private isUpHeightMax = false;
    private inDrag: boolean = false;

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if ((<any>changes).upHeight) {
            let newHeight = (<any>changes).upHeight.currentValue;
            if (newHeight) {
                this.upHeight = newHeight;
                this.prevUpHeight = newHeight;
            }
        }
        let newPaneHeight = this.upHeight;
        if (newPaneHeight < 0) {
            newPaneHeight = 0;
        }

        if (newPaneHeight > (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
            newPaneHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
        }
        this.upHeight = newPaneHeight;

        if (this.hideUpContent) {
            this.prevUpHeight = this.upHeight;
            this.upHeight = 0;
            this.splitterHeight = 0;
        } else {
            if (this.hideDownContent) {
                this.prevUpHeight = this.upHeight;
                this.upHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight;
                this.splitterHeight = 0;
            } else {
                this.upHeight = this.prevUpHeight;
                this.splitterHeight = 12;
            }
        }
    }

    restore() {
        let restoreUpHeight = this.prevUpHeight;
        this.isUpHeightMax = false;

        if (restoreUpHeight < 0) {
            restoreUpHeight = 0;
        }
        if (restoreUpHeight >= (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
            restoreUpHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
            this.isUpHeightMax = true;
        }

        this.upHeight = restoreUpHeight;
    }

    collapseUp() {
        this.upHeight = 0;
        this.isUpHeightMax = false;
    }

    collapseDown() {
        this.upHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
        this.isUpHeightMax = true;
    }

    onDragStart($event: DragEvent) {
        if ($event.srcElement === this.splitterRef.element.nativeElement) {
            this.originalX = $event.x;
            this.originalY = $event.y;
            this.originalUpHeight = this.upHeight;
            this.inDrag = true;
        }
    }

    onDragEnd($event: DragEvent) {
        this.inDrag = false;

        if (this.upHeight > 0 &&
            this.upHeight < (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
            this.prevUpHeight = this.upHeight;
        }
    }

    onDrag($event: DragEvent) {
        if (this.inDrag) {
            let newPaneHeight = this.originalUpHeight + $event.y - this.originalY;
            this.isUpHeightMax = false;

            if (newPaneHeight < 0) {
                newPaneHeight = 0;
            }

            if (newPaneHeight > (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
                newPaneHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
                this.isUpHeightMax = true;
            }
            this.upHeight = newPaneHeight;
        }
    }

    onDragOver($event: DragEvent) {
        $event.preventDefault();
    }
}