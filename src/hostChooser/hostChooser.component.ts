import { Component } from '@angular/core';
import { ShellService } from '../shell.service';

@Component({
    selector: 'p-host-chooser',
    template: `
        <div class="heading">
            <div
                class="input-group input-group-lg"
                *ngIf="shellService.plotterShellModel && shellService.plotterShellModel.stateDirectory">

                <h1 class="h1">Plotter Host</h1>
                <h3>Choose Plotter Host:</h3>

                <select
                    class="form-control"
                    [(ngModel)]="selectedStateRepository">

                    <option 
                        *ngFor="let stateRepo of shellService.plotterShellModel.stateDirectory.stateRepositories" 
                        [ngValue]="stateRepo">

                        {{ stateRepo.uniqueId }} ({{ stateRepo.stateRepositoryType }}:{{ stateRepo.path }})
                    </option>
                </select>
            </div>
        </div>
        <div class="body">
        </div>
    `,
    styles: [
        `
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
        }

        .heading {
            background-color: mediumaquamarine;
            padding: 10px;
        }

        .body {
            background-color: darkcyan;
            flex: 1 1 auto;
            padding: 10px;
        }
        `
    ]
})
export class HostChooserComponent {
    constructor(private shellService: ShellService) {}
}
