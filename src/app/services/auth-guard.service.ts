import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private AuthService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.AuthService.isLoggedIn()) return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}