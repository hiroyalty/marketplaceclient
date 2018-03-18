import { AlertService } from './../services/alert.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/primeng';

import { AuthService } from './../services/auth.service';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: AlertService,
    private notificationsService: NotificationsService,
    private authService: AuthService) { }
  
  ngOnInit() {
    //reset login status
    this.authService.logout();

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  /*ngOnDestroy() {
    this.notification.clear();
  }*/

  signIn(credentials) {
    this.authService.login(credentials)
      //.map(result => result.json())
      .subscribe(user => { 
        if (user) {
          let returnUrl = localStorage.getItem('returnUrl');
          localStorage.removeItem('returnUrl');
          this.router.navigate([ returnUrl || '/' ]);
        }
      },
        errorMessage => {
          //this.alertService.error(errorMessage);
          this.notificationsService.notify("error", 'Login Error', 'Incorrect Username and/or Password');
          this.errorMessage = <any>errorMessage;
        });
  }

  /*getMessages(): Message[] {
    return this.notification.message;
  }*/
}