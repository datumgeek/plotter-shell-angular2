import { Component, OnInit, Input, ViewContainerRef, ComponentRef, ViewChild, ModuleWithComponentFactories, Compiler, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'p-compose',
  template: `
    <div #placeholder></div>
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
      this.compiler.compileModuleAndAllComponentsAsync(type)
        .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
          const factory = moduleWithFactories
            .componentFactories
            .find(x => x.componentType.name === that.component);
          that.comp = that.placeholderRef.createComponent(factory, 0);
          if (that.state) {
            if (typeof that.comp.instance.setDynState == 'function') {
              that.comp.instance.setDynState(that.state);
            }
          }
        });
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
