import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { NotificationsService } from 'app/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'app/models/app-user';

@Component({
  selector: 'app-project-interest',
  templateUrl: './project-interest.component.html',
  styleUrls: ['./project-interest.component.css']
})
export class ProjectInterestComponent implements OnInit {
  currentUser: AppUser;
  userId: string;
  
  /* The Project Interest part*/
  isDatabaseChecked: boolean; isProgrammingChecked: boolean;
  isProBigDataChecked: boolean; isProMySqlChecked: boolean; prooracle: boolean;
  prosqlserver: boolean; propostgresql: boolean; prosqllite: boolean;

  errorMessage: string;
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private notificationsService: NotificationsService,
    private userService: UserService,
    private authService: AuthService,
    private zone: NgZone
  ) { 

    /* The Project Interest part*/
    this.isDatabaseChecked = false; this.isProgrammingChecked = false;
    this.isProBigDataChecked = false; this.isProMySqlChecked = false;

    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
  }

  /* The Project Interest part*/
  onDatabChange($event) {
    console.log('select database details clicked');
    this.isDatabaseChecked = !this.isDatabaseChecked;
    this.isProBigDataChecked = false;
    this.isProMySqlChecked = false;
    this.prooracle = false;
    this.propostgresql = false;
    this.prosqllite = false;
    this.prosqlserver = false;
  }

  onProgChange($event) {
    this.isProgrammingChecked = !this.isProgrammingChecked;
  }
  
  updateUserInterestedProject($event) {
    this.isProMySqlChecked = !this.isProMySqlChecked;
    if(this.isProMySqlChecked) {
      console.log("mysql is turned on and clicked");
    } else {
      console.log("mysql is turned off and unclicked"); 
    }
  }
 
}
