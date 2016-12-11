import { Router } from '@angular/router';
import { ShellService } from '../shell.service';
import { StateRepository } from 'plotter-shell-model/dist/lib';
export declare class HostChooserComponent {
    private shellService;
    private router;
    selectedStateRepository: StateRepository;
    constructor(shellService: ShellService, router: Router);
    choose(stateRepository: any): void;
    enterPressed($event: KeyboardEvent): void;
    selectInserted($event: any): void;
}
