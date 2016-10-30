import { Component, OnInit, Input } from '@angular/core';
import { ViewInstance } from 'plotter-shell-model/dist/lib';
import { ShellService } from '../shell.service';

@Component({
  selector: 'p-shell-toolbar',
  template: require('./shellToolbar.component.html'),
  styles: [``]
})
export class ShellToolbarComponent implements OnInit {
    @Input() public activeViewInstance: ViewInstance;
    @Input() public viewInstances: ViewInstance[];
    @Input() public showTitle: boolean;
    @Input() public showArrow: boolean;
    @Input() public isUp: boolean;
    @Input() public moveToViewInstances: ViewInstance[];

    constructor(private shellService: ShellService) {}

    ngOnInit() {
        var i = 7;
    }

    public moveItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        let that = this;
        
        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.activeViewInstance = viArr[0];
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
            this.activeViewInstance = viArr[0];
        }
    }
}
