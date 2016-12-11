import { OnChanges, SimpleChanges } from '@angular/core';
export declare class TabLayoutComponent implements OnChanges {
    state: any;
    pParentVisible: boolean;
    children: TabLayoutComponent[];
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
