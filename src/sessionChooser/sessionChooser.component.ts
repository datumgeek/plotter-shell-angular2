import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository, StateSession } from 'plotter-shell-model/dist/lib/index';

@Component({
    selector: 'p-session-chooser',
    template: `
        <div class="heading">

            <h1 class="h1">Session Chooser</h1>
            <h3>Choose a Session:</h3>

            <div class="input-group input-group-lg"
                *ngIf="sessionIdList">

                <select class="form-control"
                    [(ngModel)]="selectedSessionId">

                    <option value="">(new session)</option>

                    <option
                        *ngFor="let sessionId of sessionIdList" 
                        [ngValue]="sessionId">

                        {{ sessionId }}
                    </option>
                    
                </select>

                <span class="input-group-addon" (click)="choose(selectedSessionId)">
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

export class SessionChooserComponent implements OnInit {

    stateRepositoryId: string;
    stateRepository: StateRepository;
    sessionIdList: string[];
    selectedSessionId: string;

    constructor(
        private shellService: ShellService
        , private router: Router
        , private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let that = this;

        this.activatedRoute.params.subscribe(params => {
            that.stateRepositoryId = params['stateRepositoryId'];

            this.stateRepository = this.shellService.plotterShellModel.stateDirectory.getStateRepository(this.stateRepositoryId);
            if (this.stateRepository) {
                this.stateRepository.getSessionList()
                    .then(sessionList => {
                        that.sessionIdList = sessionList;
                    });
            }

            if (!that.stateRepositoryId) {
                alert(`missing state repository parameter.`);
            }

            if (!this.stateRepository) {
                alert(`no matching state repository for uniqueId: ${that.stateRepositoryId}`);
            }
        });
    }

    choose(selectedSessionId) {
        alert(`You chose: ${selectedSessionId}`);
    }
}
