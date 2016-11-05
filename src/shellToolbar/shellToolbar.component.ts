import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewInstance } from 'plotter-shell-model/dist/lib';
import { ShellService } from '../shell.service';

@Component({
  selector: 'p-shell-toolbar',
  template: require('./shellToolbar.component.html'),
  styles: [``]
})
export class ShellToolbarComponent implements OnInit {
    // setup two-way binding for activeViewInstance
    @Input() public activeViewInstance: ViewInstance;
    @Output() public activeViewInstanceChange: EventEmitter<ViewInstance> = new EventEmitter<ViewInstance>();

    @Input() public viewInstances: ViewInstance[];
    @Input() public showTitle: boolean;
    @Input() public showArrow: boolean;
    @Input() public isUp: boolean;
    @Input() public moveToViewInstances: ViewInstance[];

    constructor(private shellService: ShellService) {}

    ngOnInit() {
        var i = 7;
    }

    setFocus(vi: ViewInstance) {
        this.activeViewInstance = vi;
        this.activeViewInstanceChange.emit(vi);
    }

    public moveItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        let that = this;
        
        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.setFocus(viArr[0]);
        }

        if (vi.paneType === 'alt') {
            vi.paneType = 'main';
            this.shellService.launchViewInstance(vi);
        } else {
            vi.paneType = 'alt';
            this.shellService.launchViewInstance(vi);
        }
    }

    public removeItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        let that = this;

        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.setFocus(viArr[0]);
        }
    }
}
