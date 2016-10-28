import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';

@Component({
    selector: 'p-host-chooser',
    template: `
        <div class="heading">

            <h1 class="h1">Plotter Host</h1>
            <h3>Choose Plotter Host:</h3>

            <div class="input-group input-group-lg"
                *ngIf="shellService.plotterShellModel && shellService.plotterShellModel.stateDirectory">

                <select class="form-control"
                    [(ngModel)]="selectedStateRepository">

                    <option 
                        *ngFor="let stateRepo of shellService.plotterShellModel.stateDirectory.stateRepositories" 
                        [ngValue]="stateRepo">
                        
                        {{ stateRepo.uniqueId }} ({{ stateRepo.stateRepositoryType.toLowerCase() }}:{{ stateRepo.path }})
                    </option>
                    
                </select>

                <span class="input-group-addon" (click)="choose(selectedStateRepository)">
                    <i class="fa fa-arrow-circle-right fa-lg"></i>
                </span>

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

    constructor(
        private shellService: ShellService,
        private router: Router) {}

    choose(stateRepository) {
        this.router.navigate(['/sessions', { stateRepositoryId: stateRepository.uniqueId }]);
    }
}
