import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  currentUser?: User;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(

      tap(response => {

        localStorage.setItem(
          'token',
          response.token
        );

      }),

      switchMap(() => this.getCurrentUser()),

      tap(user => {

        this.currentUser = user;

      })

    );

  }

  getCurrentUser(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/me`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    );

  }

  logout(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`
        })
      }
    ).pipe(

      tap(() => {

        localStorage.removeItem('token');
        this.currentUser = undefined;

      })

    );

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  isAuthenticated(): boolean {

    return this.getToken() !== null;

  }

}