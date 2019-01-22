import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  forgotpassword: boolean = true;
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  initiatePasswordChange(useremail){
    this.authService.initiatePasswordChange(useremail)
      .subscribe(data => {
        this.forgotpassword = false;
        this.notificationsService.notify("success", 'Success', 'Check your email to complete the process');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Error', errorMessage);
        this.errorMessage = <any>errorMessage
      });
  }
 
} 
