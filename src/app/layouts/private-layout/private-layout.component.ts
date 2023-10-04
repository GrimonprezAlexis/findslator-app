import { Component } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  template: `
    <div class="private-layout">
      <app-menu></app-menu>

      <div class="container">
        <ng-content></ng-content>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./private-layout.component.scss'],
})
export class PrivateLayoutComponent {}
