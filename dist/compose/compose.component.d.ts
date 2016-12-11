import { OnInit, OnChanges, SimpleChanges, ViewContainerRef, ComponentRef, Compiler, ComponentFactoryResolver, Injector } from '@angular/core';
import { ModuleService } from '../module.service';
export declare class ComposeComponent implements OnInit, OnChanges {
    private moduleService;
    private injector;
    private compiler;
    private componentFactorResolver;
    cmodule: string;
    component: string;
    state: string;
    pParentVisible: boolean;
    placeholderRef: ViewContainerRef;
    comp: ComponentRef<any>;
    private isViewInitialized;
    hasError: boolean;
    errorTitle: string;
    errorMessage: string;
    constructor(moduleService: ModuleService, injector: Injector, compiler: Compiler, componentFactorResolver: ComponentFactoryResolver);
    loadSubcomponent(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
