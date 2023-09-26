import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserRole } from 'src/app/_core/types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isAuthenticated$ = this._auth0Service.isAuthenticated$;

  constructor(
    private _auth0Service: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {}

  handleLogin(userRole: UserRole): void {
    const roleAsString: string = userRole.toString();
    sessionStorage.setItem('userRole', roleAsString);
    this._auth0Service.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }

  handleLogout(): void {
    this._auth0Service.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
