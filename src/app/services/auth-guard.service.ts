import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private localStore: LocalService, private router: Router) { }

  canActivate(): boolean {
    if (this.localStore.getData('currUser') !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
