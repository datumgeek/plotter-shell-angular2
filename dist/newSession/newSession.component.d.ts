import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository, PakDirectory } from 'plotter-shell-model/dist/lib/index';
export declare class NewSessionComponent implements OnInit {
    private shellService;
    private activatedRoute;
    private router;
    stateRepositoryId: string;
    stateRepository: StateRepository;
    pakDirectory: PakDirectory;
    constructor(shellService: ShellService, activatedRoute: ActivatedRoute, router: Router);
    ngOnInit(): void;
}
