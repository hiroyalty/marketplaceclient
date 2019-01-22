import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {ValidationManager} from "ng2-validation-manager";
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form;
  utoken: string;
  usercred: any = {};
  errMsg: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.utoken = this.route.snapshot.paramMap.get('utoken');

    this.form = new ValidationManager({
      'password'    : 'required|rangeLength:4,50',
      'repassword'  : 'required|equalTo:password',
    });

    this.form.setValue({ });
  }

  removeFormGroup(){
    this.form.removeChildGroup('repassword');
  }

  processPassowrdChange(){
    if(this.form.isValid()){
      alert('validation pass');
      this.removeFormGroup();
      this.usercred = this.form.getData();
      this.usercred['utoken'] = this.utoken;
      console.log(this.usercred);
      this.authService.processPasswordChange(this.usercred)
        .subscribe(user => { 
          if (user) {
            let returnUrl = localStorage.getItem('returnUrl');
            localStorage.removeItem('returnUrl');
            this.notificationsService.notify("success", 'Success', 'Password reset Sucessful');
            this.router.navigate([ returnUrl || '/' ]);
          }
        },
        errMsg => {
          this.notificationsService.notify("error", 'Error', errMsg);
          this.errMsg = <any>errMsg
        });
      //this.form.reset(); 
    }
  }

}
