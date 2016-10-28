import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ShellService } from './shell.service';
import { FileManager } from './fileManager/fileManager';

import { ShellComponent } from './shell/shell.component';
import { HostChooserComponent } from './hostChooser/hostChooser.component';
import { SessionChooserComponent } from './sessionChooser/sessionChooser.component';
import { ComposeComponent } from './compose/compose.component';

const routes: Routes = [
  { path: '', component: HostChooserComponent },
  { path: 'sessions', component: SessionChooserComponent },  
  { path: 'shell', component: ShellComponent}
];

@NgModule({
  declarations: [
    ShellComponent,
    ComposeComponent,
    HostChooserComponent,
    SessionChooserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ShellService,
    FileManager
  ],
  exports: [
    ShellComponent,
    ComposeComponent,
    HostChooserComponent,
    SessionChooserComponent
  ]
})
export class ShellModule { }
