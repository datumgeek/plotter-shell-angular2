import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ShellService } from './shell.service';
import { FileManager } from './fileManager/fileManager';
import { ModuleService } from './module.service';
import { ParameterService } from './parameter.service';
import { ResourceService } from './resource.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ShellService,
    FileManager,
    ModuleService,
    ParameterService,
    ResourceService
  ],
  exports: []
})
export class ShellProvidersModule { }
