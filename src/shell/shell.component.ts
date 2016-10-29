import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComposeComponent } from '../compose/compose.component';
import { ShellService } from '../shell.service';
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

  public navViewInstances = new Array<ViewInstance>();
  public navActiveViewInstance;

  public mainViewInstances = new Array<ViewInstance>();
  public mainActiveViewInstance;
  public mainCollapsed = false;

  public altViewInstances = new Array<ViewInstance>();
  public altActiveViewInstance;
  public altCollapsed = false;

  private viewInstancesLoadedPromise: Promise<boolean>;
  private viewInstancesLoadedResolve: (bool) => void;
  private viewInstancesLoadedReject: (any) => void;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shellService: ShellService
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

      this.startShell()
        .then(() => {
          this.loadViewInstances();
        });
    });
  }

  loadViewInstances() {
    this.stateSession.activePaks.forEach(activePak => {
      activePak.viewInstances.forEach(viewInstance => {
        this.launchViewInstance(viewInstance);
      });
    });

    this.viewInstancesLoadedResolve(true);
  }

  public focusViewInstance = (viewInstance: ViewInstance) => {
    switch (viewInstance.paneType) {
      case 'nav':
        this.navActiveViewInstance = viewInstance;
        break;

      case 'main':
        this.mainActiveViewInstance = viewInstance;
        break;

      case 'alt':
        this.altActiveViewInstance = viewInstance;
        break;

      default:
        break;
    }
  }

  public launchViewInstance = (viewInstance: ViewInstance) => {
    switch (viewInstance.paneType) {
      case 'nav':
        this.navViewInstances.push(viewInstance);
        if (!this.navActiveViewInstance) {
          this.navActiveViewInstance = viewInstance;
        }
        break;

      case 'main':
        this.mainViewInstances.push(viewInstance);
        if (!this.mainActiveViewInstance) {
          this.mainActiveViewInstance = viewInstance;
        }
        break;

      case 'alt':
        this.altViewInstances.push(viewInstance);
        if (!this.altActiveViewInstance) {
          this.altActiveViewInstance = viewInstance;
        }
        break;

      default:
        break;
    }

    this.focusViewInstance(viewInstance);
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
