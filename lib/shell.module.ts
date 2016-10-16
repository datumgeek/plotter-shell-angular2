import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ShellComponent } from './shell.component';
import { ComposeComponent } from './compose.component';

@NgModule({
  declarations: [
    ShellComponent,
    ComposeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
})
export class ShellModule { }
