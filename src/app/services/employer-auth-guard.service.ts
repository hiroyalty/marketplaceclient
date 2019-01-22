import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployerAuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService ) { }

  canActivate() {
    let user = this.authService.currentUser;
    if (user && user.role === 'employer') return true;

    this.router.navigate(['/no-access']);
    return false;
  }
 
}
