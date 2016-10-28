import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository, StateSession } from 'plotter-shell-model/dist/lib/index';

@Component({
    selector: 'p-session-chooser',
    host: { '(window:keydown)': 'keydown($event)', '(body:DOMNodeInserted)': 'selectInserted($event)' },
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
        this.activatedRoute.params.subscribe(params => {
            this.stateRepositoryId = params['stateRepositoryId'];

            this.stateRepository = this.shellService.plotterShellModel.stateDirectory.getStateRepository(this.stateRepositoryId);
            if (this.stateRepository) {
                this.stateRepository.getSessionList()
                    .then(sessionList => {
                        this.sessionIdList = sessionList;
                        if (this.sessionIdList.length > 0) {
                            this.selectedSessionId = this.sessionIdList[0];
                        }
                    });
            }

            if (!this.stateRepositoryId) {
                alert(`missing state repository parameter.`);
            }

            if (!this.stateRepository) {
                alert(`no matching state repository for uniqueId: ${this.stateRepositoryId}`);
            }
        });
    }

    choose(selectedSessionId) {
        if (selectedSessionId) {
            this.router.navigate(['/shell', { stateRepositoryId: this.stateRepositoryId, sessionId: selectedSessionId }]);
        } else {
            this.router.navigate(['/new-session', { stateRepositoryId: this.stateRepositoryId }]);
        }
    }

    keydown($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.choose(this.selectedSessionId);
        }
    }

    selectInserted($event) {
        if ($event.relatedNode.nodeName === 'SELECT') {
            $event.relatedNode.focus();
        }
    }
}
