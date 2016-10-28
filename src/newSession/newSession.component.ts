import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';

@Component({
    selector: 'p-new-session',
    template: `
        <div class="heading">

            <h1 class="h1">New Session</h1>
            <h3>Choose Desired Paks:</h3>

            <div class="input-group input-group-lg"
                *ngIf="false">

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

export class NewSessionComponent {

    constructor(
        private shellService: ShellService,
        private router: Router) {}
}
