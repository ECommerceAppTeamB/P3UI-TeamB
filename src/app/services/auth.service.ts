import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { LocalService } from 'src/app/services/local.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl: string = `${ environment.baseUrl }/auth`;
  loggedIn: boolean = false;
  currUser?: User | null;

  constructor(private localStore: LocalService, private http: HttpClient) {
    const storedUser = this.localStore.getData('user');
    if (storedUser) {
      this.currUser = JSON.parse(storedUser);
      this.loggedIn = true;
    }
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${ this.authUrl }/login`, payload, {
      headers: environment.headers,
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response) {
          this.currUser = new User(response.userId, response.firstName, response.lastName, response.email, response.password);
          this.localStore.saveData('user', JSON.stringify(this.currUser));
        }
      })
    );
  };

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, email: email, password: password };
    return this.http.post<any>(`${ this.authUrl }/register`, payload, { headers: environment.headers }).pipe(
      tap(response => {
        if (response) {
          this.currUser = new User(response.id, response.firstName, response.lastName, response.email, response.password);
          this.localStore.saveData('user', JSON.stringify(this.currUser));
        }
      })
    );
  };

  logout(): void {
    this.loggedIn = false;
    this.currUser = null;
    localStorage.removeItem('user');
  }

  resetPassword(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.patch<any>(`${this.authUrl}/reset-password`, payload, {headers: environment.headers});
  }
}
