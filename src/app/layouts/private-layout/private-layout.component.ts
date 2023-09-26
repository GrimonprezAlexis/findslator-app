import { Component } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  template: `
    <div class="private-layout">
      <app-menu></app-menu>

      <div class="private-layout__content">
        <ng-content></ng-content>
      </div>

      <app-footer></app-footer>
    </div>
  `,
})
export class PrivateLayoutComponent {}
