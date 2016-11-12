import { Component } from '@angular/core';
import { ITab } from '../ITab';

@Component({
    selector: 'p-page-layout',
    template: `
        <div *ngIf="state.layout.title">{{ state.layout.title }}</div>

        <p-compose
            *ngIf="state.layout.header"
            [cmodule]="state.layout.header.cmodule"
            [component]="state.layout.component"
            [state]="state.layout.header.state">
        </p-compose>

        <template *ngIf="state.layout.tabs">
            <div class="btn-group" data-toggle="buttons">
                <label *ngFor="let vi of viewInstances; let ii = index" class="btn btn-primary {{vi === activeViewInstance ? 'active' : ''}}">
                    <input type="radio" name="vi" [ngModel]="vi" (click)="setFocus(vi)" [checked]="activeViewInstance === vi">
                    <i class="fa fa-plug"></i>
                    <span *ngIf="showTitle">{{vi.title}}</span>
                    <i *ngIf="isUp && showArrow" class="fa fa-arrow-circle-up" (click)="moveItem(vi, ii, viewInstances)"></i>
                    <i *ngIf="!isUp && showArrow" class="fa fa-arrow-circle-down" (click)="moveItem(vi, ii, viewInstances)"></i>
                    <i *ngIf="!vi.hideClose" class="fa fa-times" (click)="removeItem(vi, ii, viewInstances)"></i>
                </label>
            </div>

        </template>
        `,
    styles: [``]
})
export class PageLayoutComponent {
    state: any;
}