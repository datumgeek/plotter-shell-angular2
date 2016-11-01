import { Component, ElementRef, Input, OnChanges } from '@angular/core';

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
        <div splitter [style.height.px]="splitterHeight" draggable="true" (dragover)="onDragOver($event)">
            <i 
                class="button-collapse-up fa fa-arrow-circle-up" 
                (click)="collapseUp()"
                [style.font-size.px]="splitterHeight + 2" 
                aria-hidden="true">
            </i>
            <i 
                class="button-collapse-down fa fa-arrow-circle-down"
                (click)="collapseDown()"
                [style.font-size.px]="splitterHeight + 2" 
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
            background-color: green;
            flex: 0 0 auto;
            height: 270px;
            overflow: auto;
        }

        :host [splitter] {
            position: relative;
            background-color: silver;
            flex: 0 0 auto;
            height: 15px;
        }

        :host .button-collapse-down {
            position: absolute;
            top: 0;
            right: 0;
        }

        :host .button-collapse-up {
            position: absolute;
            top: 0;
            left: 0;
        }

        :host [down] {
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
export class UpDownSplitterComponent implements OnChanges {

    @Input() upHeight: number = 300;
    @Input() splitterHeight: number = 20;

    private originalX: number = 0;
    private originalY: number = 0;
    private originalupHeight: number = 300;
    private inDrag: boolean = false;

    constructor(private el: ElementRef) {}

    ngOnChanges() {
            let newPaneHeight = this.upHeight;
            if (newPaneHeight < 0) {
                newPaneHeight = 0;
            }

            if (newPaneHeight > (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
                newPaneHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
            }
            this.upHeight = newPaneHeight;
    }

    clickIt() { 
        this.upHeight += 20;
    }

    collapseUp() {
        this.upHeight = 0;
    }

    collapseDown() {
        this.upHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
    }

    onDragStart($event: DragEvent) {
        this.originalX = $event.x;
        this.originalY = $event.y;
        this.originalupHeight = this.upHeight;
        this.inDrag = true;
    }

    onDragEnd($event: DragEvent) {
        this.inDrag = false;
    }

    onDrag($event: DragEvent) {
        if (this.inDrag) {
            let newPaneHeight = this.originalupHeight + $event.y - this.originalY;
            if (newPaneHeight < 0) {
                newPaneHeight = 0;
            }

            if (newPaneHeight > (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight) {
                newPaneHeight = (<HTMLElement>(this.el.nativeElement)).clientHeight - this.splitterHeight;
            }
            this.upHeight = newPaneHeight;
        }
    }

    onDragOver($event: DragEvent) {
        $event.preventDefault();
    }
}