import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { User, UserAuth, UserProfile } from '../types/user.type';
import { PostUserResponse, UserApiResponse } from '../types/api.type';
import { CookieService } from 'ngx-cookie-service';

const baseUrl = `${environment.api.serverUrl}/api`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private readonly USER_COOKIE_KEY = 'user_data';

  setUser(user: User<UserProfile> | UserAuth<UserProfile>): void {
    this.cookieService.set(this.USER_COOKIE_KEY, JSON.stringify(user));
  }

  getUser(): User<UserProfile> | UserAuth<UserProfile> {
    const userCookie = this.cookieService.get(this.USER_COOKIE_KEY);
    return userCookie ? JSON.parse(userCookie) : null;
  }

  clearUser(): void {
    this.cookieService.delete(this.USER_COOKIE_KEY);
  }

  getUserByQuery(
    queryType: 'id' | 'email' | 'auth0Id',
    value: string | undefined
  ): Observable<UserAuth<UserProfile>> {
    let url: string;

    switch (queryType) {
      case 'id':
        url = `${baseUrl}/user?id=${value}`;
        break;
      case 'email':
        url = `${baseUrl}/user?email=${value}`;
        break;
      case 'auth0Id':
        url = `${baseUrl}/auth0Id?id=${value}`;
        break;
      default:
        throw new Error('Invalid queryType');
    }

    return this.http.get<UserApiResponse<UserAuth<UserProfile>>>(url).pipe(
      map((response) => response.user),
      catchError((error) => {
        console.error(`Error during getting user:`, error);
        throw error;
      })
    );
  }

  // Function to create a new user
  createUser(user: UserAuth<undefined>): Observable<PostUserResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<UserApiResponse<PostUserResponse>>(`${baseUrl}/user`, user, {
        headers,
      })
      .pipe(
        map((response) => response.user),
        catchError((error) => {
          console.error('Error during user creation:', error);
          throw error;
        })
      );
  }

  //Add email type any quick fix
  updateUser(email: any, user: User<UserProfile>): Observable<any> {
    const body = { email, user };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<UserApiResponse<any>>(
        `${baseUrl}/user/update`,
        { email, updatedObject: body },
        {
          headers,
        }
      )
      .pipe(
        map((response) => response.user),
        catchError((error) => {
          console.error('Error during user update:', error);
          throw error;
        })
      );
  }
}
