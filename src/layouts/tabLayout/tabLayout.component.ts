import { Component, Input } from '@angular/core';
import { ITab } from '../ITab';

@Component({
    selector: 'p-tab-layout',
    template: `
        <p-up-down-splitter 
            [hide-up-content]="!state.layout.title && !state.layout.header" 
            [hide-down-content]="!state.layout.tabs && state.layout.tabs.length <= 0" 
            class="up-down-splitter">

            <div up-pane class="up-pane" *ngIf="state.layout.title || state.layout.header">

                <div class="title" *ngIf="state.layout.title">{{ state.layout.title }}</div>

                <p-compose
                    *ngIf="state.layout.header"
                    [cmodule]="state.layout.header.cmodule"
                    [component]="state.layout.component"
                    [state]="state.layout.header.state">
                </p-compose>
            </div>

            <div down-pane class="down-pane" *ngIf="state.layout.tabs && state.layout.tabs.length > 0">

                <div class="btn-group main-tabs" data-toggle="buttons">
                    <label *ngFor="let tab of state.layout.tabs; let ii = index" class="btn btn-primary {tab === state.layout.activeTab ? 'active' : ''}}">
                        <input type="radio" name="mainTabs" [ngModel]="tab" (click)="state.layout.activeTab = tab" [checked]="state.layout.activeTab === tab">
                        <span>{{tab.title}}</span>
                    </label>
                </div>

                <div class="main-body">
                    <div class="main-host">
                        <p-tab-layout
                            *ngFor="let tab of state.layout.tabs"
                            [state]="tab.header.state"
                            [style.visibility]="tab === state.layout.activeTab ? 'visible' : 'hidden'">
                        </p-tab-layout>
                    </div>
                </div>

            </div>

        </p-up-down-splitter>

        `,
    styles: [``]
})
export class TabLayoutComponent {
    @Input() state: any;
}