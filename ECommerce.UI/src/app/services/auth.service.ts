import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authUrl: string = `${ environment.baseUrl }/auth`;
  loggedIn: boolean = false;
  currUser?: User | null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${ this.authUrl }/login`, payload, {
      headers: environment.headers,
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response) {
          this.currUser = new User(response.userId, response.firstName, response.lastName, response.email, response.password);
        }
      })
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, email: email, password: password };
    return this.http.post<any>(`${ this.authUrl }/register`, payload, { headers: environment.headers }).pipe(
      tap(response => {
        if (response) {
          this.currUser = new User(response.id, response.firstName, response.lastName, response.email, response.password);
        }
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    this.currUser = null;
    this.http.post(`${ this.authUrl }/logout`, null);
  }
}
