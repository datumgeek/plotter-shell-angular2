import { Component } from '@angular/core';
import { ShellService } from '../shell.service';

@Component({
    selector: 'p-host-chooser',
    template: `
        <div class="heading"><kbd>heading</kbd></div>
        <div class="body">body</div>
    `,
    styles: [ require('bootstrap/dist/css/bootstrap.css'),
        `
        :host {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
        }

        .heading {
            background-color: mediumaquamarine;
        }

        .body {
            background-color: lightseagreen;
            flex: 1 1 auto;
        }
        `
    ]
})
export class HostChooserComponent {
    constructor(private shellService: ShellService) {}
}
