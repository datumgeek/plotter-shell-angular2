import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './shell.component';
import { ComposeComponent } from './compose.component';

const routes: Routes = [
  { path: '', component: ShellComponent}
];

@NgModule({
  declarations: [
    ShellComponent,
    ComposeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  exports: [
    ShellComponent,
    ComposeComponent
  ]
})
export class ShellModule { }
