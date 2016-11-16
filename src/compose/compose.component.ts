import {
  Component, OnInit, OnChanges, SimpleChanges, Input, ViewContainerRef, ComponentRef, ViewChild,
  ModuleWithComponentFactories, Compiler, ComponentFactoryResolver,
  ReflectiveInjector, Injector
} from '@angular/core';
import { ModuleService } from '../module.service';

@Component({
  selector: 'p-compose',
  template: `
    <div #placeholder *ngIf="!hasError"></div>
    <div *ngIf="hasError">
      <h3>Error {{ errorTitle }}</h3>
      <p>{{ errorMessage }}</p>
    </div>
    `,
  styles: [`
    :host {
      position: relative;
    }

    :host div {
      position: relative;
      margin: 0;
      padding: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
  `]
})
export class ComposeComponent implements OnInit, OnChanges {

  @Input() cmodule: string;
  @Input() component: string;
  @Input() state: string;
  @Input('p-parent-visible') pParentVisible: boolean = true;

  @ViewChild("placeholder", { read: ViewContainerRef }) placeholderRef: ViewContainerRef;
  comp: ComponentRef<any>;
  private isViewInitialized: boolean = false;

  public hasError = false;
  public errorTitle = '';
  public errorMessage = '';

  constructor(
    private moduleService: ModuleService,
    private injector: Injector,
    private compiler: Compiler,
    private componentFactorResolver: ComponentFactoryResolver) { }

  loadSubcomponent() {
    let that = this;

    if (!this.isViewInitialized) {
      return;
    }
    if (this.comp) {
      this.comp.destroy();
    }

    this.moduleService.getModule(this.cmodule)
      .then(moduleCatalogItem => {
        const factory = moduleCatalogItem.componentFactories
          .find(x => x.componentType.name === that.component);

        if (!factory) {
          that.hasError = true;
          that.errorTitle = `Error in Compose: Failed to find factory for ${that.component}`;
          that.errorMessage = `within module ${that.cmodule}`;

        } else {
          // const injector = ReflectiveInjector.fromResolvedProviders([], this.injector);

          //let refInj = ReflectiveInjector.resolveAndCreate([t])
          that.comp = that.placeholderRef.createComponent(factory, null, moduleCatalogItem.injector, []);
          if (!that.comp) {
            that.hasError = true;
            that.errorTitle = `Error in Compose: Create Component Failed for ${that.component}`;
            that.errorMessage = `within module ${that.cmodule}`;

          } else {

            if (that.state) {
              if (typeof that.comp.instance.setDynState == 'function') {
                that.comp.instance.setDynState(that.state);
              }
              this.comp.instance.pParentVisible = this.pParentVisible;
            }
          }
        }
      }).catch(err => {
        that.hasError = true;
        that.errorTitle = `Error in Compose: Failed to compile Type for ${that.cmodule}`;
        that.errorMessage = `err: ${JSON.stringify(err)}`;
      });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let changesProp: any = changes;
    if (changesProp.cmodule || changesProp.component) {
      this.loadSubcomponent();
    } else {
      if (changesProp.state) {
        if (typeof this.comp.instance.setDynState == 'function') {
          this.comp.instance.setDynState(changes['state'].currentValue);
        }
      }

      if (changesProp.pParentVisible) {
          this.comp.instance.pParentVisible = changes['pParentVisible'].currentValue;
      }
    }
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.loadSubcomponent();
  }

  ngOnDestroy() {
    if (this.comp) {
      this.comp.destroy();
    }
  }


}
