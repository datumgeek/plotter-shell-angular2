import { Component, OnInit, Input, ViewContainerRef, ComponentRef, ViewChild, ModuleWithComponentFactories, Compiler, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'p-compose',
  template: `
    <div #placeholder *ngIf="!hasError"></div>
    <div *ngIf="hasError">
      <h3>Error {{ errorTitle }}</h3>
      <p>{{ errorMessage }}</p>
    </div>
    `,
  styles: [``]
})
export class ComposeComponent implements OnInit {

  @Input() cmodule: string;
  @Input() component: string;
  @Input() state: string;

  @ViewChild("placeholder", { read: ViewContainerRef }) placeholderRef: ViewContainerRef;
  comp: any;
  private isViewInitialized: boolean = false;

  public hasError = false;
  public errorTitle = '';
  public errorMessage = '';

  constructor(
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

    (<any>window).require([that.cmodule], (cmodule) => {
      let type = cmodule["default"];
      if (!type) {
        that.hasError = true;
        that.errorTitle = `Error in Compose: Failed to get Type for ${that.cmodule}`;
        that.errorMessage = ``;

      } else {
        that.compiler.compileModuleAndAllComponentsAsync(type)
          .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
            const factory = moduleWithFactories
              .componentFactories
              .find(x => x.componentType.name === that.component);

            if (!factory) {
              that.hasError = true;
              that.errorTitle = `Error in Compose: Failed to find factory for ${that.component}`;
              that.errorMessage = `within module ${that.cmodule}`;

            } else {
              that.comp = that.placeholderRef.createComponent(factory, 0);
              if (!that.comp) {
                that.hasError = true;
                that.errorTitle = `Error in Compose: Create Component Failed for ${that.component}`;
                that.errorMessage = `within module ${that.cmodule}`;

              } else {

                if (that.state) {
                  if (typeof that.comp.instance.setDynState == 'function') {
                    that.comp.instance.setDynState(that.state);
                  }
                }
              }
            }
          }).catch(err => {
            that.hasError = true;
            that.errorTitle = `Error in Compose: Failed to compile Type for ${that.cmodule}`;
            that.errorMessage = `err: ${JSON.stringify(err)}`;
          });
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.loadSubcomponent();
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
