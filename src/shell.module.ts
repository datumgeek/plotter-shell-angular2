import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ShellService } from './shell.service';
import { FileManager } from './fileManager/fileManager';
import { ModuleService } from './module.service';
import { ParameterService } from './parameter.service';
import { ResourceService } from './resource.service';

import { ShellComponent } from './shell/shell.component';
import { HostChooserComponent } from './hostChooser/hostChooser.component';
import { SessionChooserComponent } from './sessionChooser/sessionChooser.component';
import { NewSessionComponent } from './newSession/newSession.component';
import { ComposeComponent } from './compose/compose.component';
import { ShellToolbarComponent } from './shellToolbar/shellToolbar.component';
import { LeftRightSplitterComponent } from './leftRightSplitter/leftRightSplitter.component';
import { UpDownSplitterComponent } from './upDownSplitter/upDownSplitter.component';
import { TabLayoutComponent } from './layouts/tabLayout/tabLayout.component';
import { PageLayoutComponent } from './layouts/pageLayout/pageLayout.component';

const routes: Routes = [
  { path: '', component: HostChooserComponent },
  { path: 'sessions', component: SessionChooserComponent },
  { path: 'new-session', component: NewSessionComponent },
  { path: 'shell', component: ShellComponent }
];

@NgModule({
  declarations: [
    ShellComponent,
    ComposeComponent,
    HostChooserComponent,
    SessionChooserComponent,
    NewSessionComponent,
    ShellToolbarComponent,
    LeftRightSplitterComponent,
    UpDownSplitterComponent,
    TabLayoutComponent,
    PageLayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  exports: [
    ShellComponent,
    ComposeComponent,
    HostChooserComponent,
    SessionChooserComponent,
    NewSessionComponent,
    ShellToolbarComponent,
    LeftRightSplitterComponent,
    UpDownSplitterComponent,
    TabLayoutComponent,
    PageLayoutComponent
  ]
})
export class ShellModule { }
