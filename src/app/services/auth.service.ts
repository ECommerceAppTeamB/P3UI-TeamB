import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  storedUser?: User | null;
  currUser?: User | null;

  constructor(private localStore: LocalService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${ this.authUrl }/login`, payload, {
      headers: environment.headers,
    }).pipe(
      tap(response => {
        if (response) {
          this.authSuccess(response);
        }
      })
    );
  };

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, email: email, password: password };
    return this.http.post<any>(`${ this.authUrl }/register`, payload, { headers: environment.headers }).pipe(
      tap(response => {
        if (response) {
          this.authSuccess(response);
        }
      })
    );
  };

  logout(): void {
    this.currUser = null;
    this.localStore.clearCurrUser();
  }

  authSuccess(response: any) {
    this.currUser = new User(response.userId, response.firstName, response.lastName, response.email);
    this.localStore.saveData('currUser', JSON.stringify(this.currUser));
    console.log(this.localStore.getCurrUser());
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 2500);
  }

  resetPassword(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    return this.http.patch<any>(`${ this.authUrl }/reset-password`, payload, { headers: environment.headers });
  }
}
