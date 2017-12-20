import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberAuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService ) { }

  canActivate() {
    let user = this.authService.currentUser;
    if (user && user.role === 'member') return true;

    this.router.navigate(['/no-access']);
    return false;
  }
 

}
