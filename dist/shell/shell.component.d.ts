import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { ParameterService } from '../parameter.service';
import { StateRepository, StateSession } from 'plotter-shell-model/dist/lib';
export declare class ShellComponent implements OnInit {
    private router;
    private activatedRoute;
    private shellService;
    private parameterService;
    stateRepositoryId: string;
    stateRepository: StateRepository;
    sessionIdList: string[];
    sessionId: string;
    stateSession: StateSession;
    private viewInstancesLoadedPromise;
    private viewInstancesLoadedResolve;
    private viewInstancesLoadedReject;
    constructor(router: Router, activatedRoute: ActivatedRoute, shellService: ShellService, parameterService: ParameterService);
    views: any[];
    ngOnInit(): void;
    loadViewInstances(): void;
    startShell(): Promise<boolean>;
}
