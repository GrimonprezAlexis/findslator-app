import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environnements/environnement';
import { UserAuth, UserProfile } from '../types/user.type';
import { PostUserResponse, UserApiResponse } from '../types/api.type';

const baseUrl = `${environment.api.serverUrl}/api`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(
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
}
