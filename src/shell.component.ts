import { Component, OnInit } from '@angular/core';
import { ComposeComponent } from './compose.component';

@Component({
  selector: 'p-shell',
  template: `
    <p>
      shell works!
    </p>

    <ul>
      <li *ngFor="let view of views">
        {{ view.model.title }}
        <p-shell-compose 
          [modulePath]="view.module" 
          [className]="view.view" 
          [dynState]="view.model">
        </p-shell-compose>
        <hr />
      </li>
    </ul>
    `,
  styles: [``]
})
export class ShellComponent implements OnInit {

  constructor() { }

  views: any[] = [];

  ngOnInit() {
  }

}
