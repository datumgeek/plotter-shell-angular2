import { Component, Input, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { ITab } from '../ITab';

@Component({
    selector: 'p-tab-layout',
    template: `
        <p-up-down-splitter 
            [hide-up-content]="!state.layout.title && !state.layout.header" 
            [hide-down-content]="!state.layout.tabs || state.layout.tabs.length <= 0" 
            class="up-down-splitter">

            <div up-pane class="up-pane" *ngIf="state.layout.title || state.layout.header">

                <div class="title" *ngIf="state.layout.title">{{ state.layout.title }}</div>

                <p-compose
                    *ngIf="state.layout.header"
                    [cmodule]="state.layout.header.cmodule"
                    [component]="state.layout.header.component"
                    [state]="state.layout.header.state"
                    [p-parent-visible]="parentVisible">
                </p-compose>
            </div>

            <div down-pane class="down-pane" *ngIf="state.layout.tabs && state.layout.tabs.length > 0">

                <div class="btn-group main-tabs" data-toggle="buttons">
                    <label *ngFor="let tab of state.layout.tabs; let ii = index" class="btn btn-primary {{tab === state.layout.activeTab ? 'active' : ''}}">
                        <input type="radio" name="mainTabs" [ngModel]="tab" (click)="state.layout.activeTab = tab" [checked]="state.layout.activeTab === tab">
                        <span>{{tab.title}}</span>
                    </label>
                </div>

                <div class="main-body">
                    <div class="main-host">
                        <p-tab-layout
                            *ngFor="let tab of state.layout.tabs"
                            [state]="{ layout: tab }"
                            [style.visibility]="tab === state.layout.activeTab && parentVisible ? 'visible' : 'hidden'">
                            [p-parent-visible]="parentVisible"
                        </p-tab-layout>
                    </div>
                </div>

            </div>

        </p-up-down-splitter>

        `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            border: 0;
            flex: 1 0 auto;
            overflow: hidden;
        }

        :host .down-pane {
            display: flex;
            flex-direction: column;
            position: absolute;
            margin: 20px;
            padding: 0;
            border: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        :host .main-tabs {
            
        }

        :host .main-body {
            flex: 1 0 auto;
            position: relative;
        }

        :host .main-host {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        
        :host p-tab-layout {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 0;
            padding: 0;
        }
    `]
})
export class TabLayoutComponent {
    @Input() state: any;
    @Input('p-parent-visible') parentVisible: boolean = true;
}