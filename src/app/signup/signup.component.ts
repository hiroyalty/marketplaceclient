import { Message } from 'primeng/primeng';
import { UserService } from './../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {ValidationManager} from "ng2-validation-manager";
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usermodel: any = {};
  form;
  userrole;
  anyrole;
  errorMessage: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private userService: UserService,
    ) { 
      this.route.paramMap
        .subscribe(params => {
          this.anyrole = params.get('role');
          //console.log(this.anyrole);
        });
        this.userrole = this.anyrole ? "employer" : "user";
        console.log(this.userrole);
    }

  ngOnInit() {
    this.form = new ValidationManager({
      'firstname'        : 'required|minLength:2|maxLength:25|alphaSpace',
      'lastname'        : 'required|minLength:2|maxLength:25|alphaSpace',
      'email'       : 'required|email',
      'username'    : 'required|minLength:4|pattern:[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*',
      'password'    : 'required|rangeLength:4,50',
      'repassword'  : 'required|equalTo:password',
    });

    this.form.setValue({
    });

    this.form.setErrorMessage('username', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');
  }

  /*ngOnDestroy() {
    this.notification.clear();
  }*/

  removeFormGroup(){
    this.form.removeChildGroup('repassword');
  }

  createUserAccount(){ 
    if(this.form.isValid()){
      //alert('validation pass');
      this.removeFormGroup();
      this.usermodel = this.form.getData();
      this.usermodel['role'] = this.userrole;
      console.log(this.usermodel);
      this.userService.create(this.usermodel)
        .subscribe(data => {
          this.notificationsService.notify("success", 'Account Created', 
            'Account Successfully created, Check your email to confirm your registration');
          /*setTimeout(() => 
          this.notification.success(
            'Account Successfully created, Check your email to confirm your registration'), 1);*/
          this.router.navigate([ '/login' ]);
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Account Creation Failed', 'Username and/or Email already taken');
          this.errorMessage = <any>errorMessage
        });
      //this.form.reset();
    }
  }

  /*getMessages(): Message[] {
    return this.notification.message;
  }*/

}
