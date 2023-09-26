import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserRole } from 'src/app/_core/types/user.type';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss'],
})
export class HomeInfoComponent implements OnInit {
  constructor(private router: Router, private _auth0Service: AuthService) {}

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
}
