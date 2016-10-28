import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository, PakDirectory } from 'plotter-shell-model/dist/lib/index';

@Component({
    selector: 'p-new-session',
    template: `
    <div class="header">
        <h1>New Session on {{stateRepositoryId}}</h1>
    </div>
    <div class="body">
        <template [ngIf]="pakDirectory">
            <div *ngFor="let pakRepo of pakDirectory.pakRepositories">
                <h3>{{pakRepo.uniqueId}}</h3>
                <template [ngIf]="pakRepo && pakRepo.pakList">
                    <p *ngFor="let pakId of pakRepo.pakList">&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="checkbox" [value]="pakId"> {{pakId}}</label></p>
                </template>
            </div>
        </template>
    </div>
    `,
    styles: [
        `
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
        }

        .header {
            background-color: mediumaquamarine;
            padding: 10px;
        }
        .body {
            flex: 1 1;
            padding: 10px;
            background-color: darkcyan;
        }
        `
    ]
})

export class NewSessionComponent implements OnInit {

    stateRepositoryId: string;
    stateRepository: StateRepository;
    pakDirectory: PakDirectory;

    constructor(
        private shellService: ShellService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.stateRepositoryId = params['stateRepositoryId'];

        this.stateRepository = this.shellService.plotterShellModel.stateDirectory.getStateRepository(this.stateRepositoryId);
        this.stateRepository.getPakDirectory()
            .then(pakDirectory => {
                this.pakDirectory = pakDirectory;
                this.pakDirectory.pakRepositories.forEach(pakRepo => {
                    pakRepo.getPakList();
                });
            });

        });
    }
}
