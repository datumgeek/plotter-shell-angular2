import { ElementRef, OnChanges, ViewContainerRef, SimpleChanges } from '@angular/core';
export declare class UpDownSplitterComponent implements OnChanges {
    private el;
    splitterRef: ViewContainerRef;
    upHeight: number;
    splitterHeight: number;
    hideUpContent: boolean;
    hideDownContent: boolean;
    private originalX;
    private originalY;
    private originalUpHeight;
    private prevUpHeight;
    private isUpHeightMax;
    private inDrag;
    constructor(el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    restore(): void;
    collapseUp(): void;
    collapseDown(): void;
    onDragStart($event: DragEvent): void;
    onDragEnd($event: DragEvent): void;
    onDrag($event: DragEvent): void;
    onDragOver($event: DragEvent): void;
}
