import { Component, Input, ViewChildren, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ITab } from '../ITab';

@Component({
    selector: 'p-tab-layout',
    template: `
        <p-up-down-splitter 
            [hide-up-content]="!state.layout.title && !state.layout.header" 
            [hide-down-content]="!state.layout.tabs || state.layout.tabs.length <= 0" 
            [up-height]="state.layout.header?.upHeight"
            class="up-down-splitter">

            <div up-pane class="up-pane" *ngIf="state.layout.title || state.layout.header">
                <p-compose
                    *ngIf="state.layout.header"
                    [cmodule]="state.layout.header.cmodule"
                    [component]="state.layout.header.component"
                    [state]="state.layout.header.state"
                    [p-parent-visible]="pParentVisible">
                </p-compose>
            </div>

            <div down-pane class="down-pane" *ngIf="state.layout.tabs && state.layout.tabs.length > 0">

                <div *ngIf="false" class="btn-group main-tabs" data-toggle="buttons">
                    <label *ngFor="let tab of state.layout.tabs; let ii = index" class="btn btn-primary {{tab === state.layout.activeTab ? 'active' : ''}}">
                        <input type="radio" name="mainTabs" [ngModel]="tab" (click)="state.layout.activeTab = tab" [checked]="state.layout.activeTab === tab">
                        <span>{{tab.title}}</span>
                    </label>
                </div>

                <ul class="nav nav-tabs main-tabs">
                    <li 
                        *ngFor="let tab of state.layout.tabs; let ii = index" 
                        class="{{tab === state.layout.activeTab ? 'active' : ''}}"
                        (click)="state.layout.activeTab = tab">
                        {{tab.title}}
                    </li>
                </ul>

                <div class="main-body">
                    <div class="main-host">
                        <p-tab-layout
                            *ngFor="let tab of state.layout.tabs"
                            [state]="{ layout: tab }"
                            [style.visibility]="tab === state.layout.activeTab && pParentVisible ? 'visible' : 'hidden'">
                            [p-parent-visible]="pParentVisible"
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
            background-color: white;
            margin: 5px;
            padding: 0;
            flex: 1 0 auto;
            overflow: hidden;
        }

        :host .down-pane {
            display: flex;
            flex-direction: column;
            background-color: white;
            position: absolute;
            margin: 5px;
            padding: 0;
            border: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        :host .main-tabs {
            margin-top: 10px;
            border-bottom: solid 2px #ddd;
        }

        :host .main-tabs > li {
            margin-left:5px;
            padding: 3px;
            margin-bottom: 0;
            background-color: white;
        }

        :host .main-tabs > li.active {
            margin-bottom: -2px;
            border-left: solid 2px #ddd;
            border-top: solid 2px #ddd;
            border-right: solid 2px #ddd;
        }

        :host .main-body {
            flex: 1 0 auto;
            position: relative;
            border-left: solid 2px #ddd;
            border-bottom: solid 2px #ddd;
            border-right: solid 2px #ddd;
        }

        :host .main-host {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 5px;
            padding: 0;
            overflow: hidden;
        }
        
        :host p-tab-layout {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 5px;
            padding: 0;
        }
    `]
})
export class TabLayoutComponent implements OnChanges {
    @Input() state: any;
    @Input('p-parent-visible') pParentVisible: boolean = true;
    @ViewChildren(TabLayoutComponent) children: TabLayoutComponent[];

    ngAfterViewInit() {
        this.children.forEach(child => {
            child.pParentVisible = this.pParentVisible;
        });

    }

    ngOnChanges(changes: SimpleChanges) {
        let changesProp: any = changes;
        if (changesProp.pParentVisible) {
            if (this.children) {
                this.children.forEach(child => {
                    child.pParentVisible = changes['pParentVisible'].currentValue;
                });
            }
        }
    }

    ngOnInit() {
        if (this.state.layout.tabs && this.state.layout.tabs.length > 0) {
            this.state.layout.activeTab = this.state.layout.tabs[0];
        }
    }

}