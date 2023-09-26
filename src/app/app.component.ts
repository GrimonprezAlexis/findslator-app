import { AuthService } from '@auth0/auth0-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuth0Loading$ = this._auth0Service.isLoading$;
  constructor(private _auth0Service: AuthService) {}
}
