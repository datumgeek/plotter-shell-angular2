import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository } from 'plotter-shell-model/dist/lib/index';
export declare class SessionChooserComponent implements OnInit {
    private shellService;
    private router;
    private activatedRoute;
    stateRepositoryId: string;
    stateRepository: StateRepository;
    sessionIdList: string[];
    selectedSessionId: string;
    constructor(shellService: ShellService, router: Router, activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    choose(selectedSessionId: any): void;
    keydown($event: KeyboardEvent): void;
    selectInserted($event: any): void;
}
