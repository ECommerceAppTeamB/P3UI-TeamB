import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${ environment.baseUrl }/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const payload = { email, password };
    const response = this.http.post<any>(`${ this.authUrl }/login`, payload, {
      headers: environment.headers,
      withCredentials: true
    });
    return response;
  }

  logout(): void {
    this.loggedIn = false;
    this.http.post(`${ this.authUrl }/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, email: email, password: password };
    const response = this.http.post<any>(`${ this.authUrl }/register`, payload, { headers: environment.headers });

    return response;
  }
}
