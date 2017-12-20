import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  category: string;
  username: string;
  confirmed: boolean = false;
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.username = this.route.snapshot.paramMap.get('username');
    /*this.route.paramMap
      .subscribe(params => {
        console.log(params);
        this.category = params.get('category');
        this.username = params.get('username');
      })*/
    this.authService.confirmAccountCreation(this.category, this.username)
      .subscribe(data => {
        this.confirmed = true;
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Application Error', errorMessage);
        this.errorMessage = <any>errorMessage
      });
  }

}
