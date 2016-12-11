import { ElementRef, ViewContainerRef, OnChanges } from '@angular/core';
export declare class LeftRightSplitterComponent implements OnChanges {
    private el;
    splitterRef: ViewContainerRef;
    leftWidth: number;
    splitterWidth: number;
    hideLeftContent: boolean;
    hideRightContent: boolean;
    private originalX;
    private originalY;
    private originalLeftWidth;
    private prevLeftWidth;
    private isLeftWidthMax;
    private inDrag;
    constructor(el: ElementRef);
    clickIt(): void;
    ngOnChanges(): void;
    restore(): void;
    collapseLeft(): void;
    collapseRight(): void;
    onDragStart($event: DragEvent): void;
    onDragEnd($event: DragEvent): void;
    onDrag($event: DragEvent): void;
    onDragOver($event: DragEvent): void;
}
