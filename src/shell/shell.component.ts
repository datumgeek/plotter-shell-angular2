import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComposeComponent } from '../compose/compose.component';
import { ShellService } from '../shell.service';
import { ParameterService } from '../parameter.service';
import { StateRepository, StateSession, ViewInstance } from 'plotter-shell-model/dist/lib';

@Component({
  selector: 'p-shell',
  template: require('./shell.component.html'),
  styles: [require('./shell.component.less')]
})
export class ShellComponent implements OnInit {

  public stateRepositoryId: string;
  public stateRepository: StateRepository;
  public sessionIdList: string[];
  public sessionId: string;
  public stateSession: StateSession;

  private viewInstancesLoadedPromise: Promise<boolean>;
  private viewInstancesLoadedResolve: (bool) => void;
  private viewInstancesLoadedReject: (any) => void;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shellService: ShellService,
    private parameterService: ParameterService
  ) {
    this.viewInstancesLoadedPromise = new Promise<boolean>((resolve, reject) => {
      this.viewInstancesLoadedResolve = resolve;
      this.viewInstancesLoadedReject = reject;
    });
  }

  views: any[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      // parameters are used by startShell
      this.stateRepositoryId = params['stateRepositoryId'];
      this.sessionId = params['sessionId'];

      this.parameterService.load(params);

      this.startShell()
        .then(() => {
          this.loadViewInstances();
        });
    });
  }

  loadViewInstances() {
    this.stateSession.activePaks.forEach(activePak => {
      activePak.viewInstances.forEach(viewInstance => {
        this.shellService.launchViewInstance(viewInstance, false);
      });
    });

    this.viewInstancesLoadedResolve(true);
  }

  startShell(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.shellService.plotterShellModel.started
        .then(stateDirectory => {
          this.stateRepository = this.shellService.plotterShellModel.stateDirectory.getStateRepository(this.stateRepositoryId);

          if (this.stateRepository) {
            this.stateRepository.getSessionList()
              .then(sessionList => {
                this.sessionIdList = sessionList;
              }).catch(err => {
                reject(`error getting session list. \r\n ${err}`);
              });

            this.stateRepository.getStateSession(this.sessionId)
              .then(stateSession => {
                // shell is now started with supplied session
                this.stateSession = stateSession;
                resolve(true);
              }).catch(err => {
                reject(`error getting session list. \r\n ${err}`);
              });
          }

          if (!this.stateRepositoryId) {
            reject(`missing state repository parameter.`);
          }

          if (!this.stateRepository) {
            reject(`no matching state repository for uniqueId: ${this.stateRepositoryId}`);
          }

          if (!this.sessionId) {
            reject(`missing session id.`);
          }
        });
    });
  }
}
