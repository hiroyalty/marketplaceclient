import { AuthService } from './../services/auth.service';
import { UserService } from 'app/services/user.service';
import { NotificationsService } from './../services/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from 'app/models/app-user';
import { Component, OnInit, NgZone, Input } from '@angular/core';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  /*@Input() profile: boolean;
  @Input() cv: boolean; 
  @Input() database: boolean; 
  @Input() program: boolean;
  @Input() web: boolean;
  @Input() mobile: boolean; 
  @Input() net: boolean; 
  @Input() games: boolean;
  @Input() project: boolean; 
  @Input() password: boolean;*/
  currentUser: AppUser;
  userId: string;

  /* from profile to games*/
  profile: boolean; 
  cv: boolean; database: boolean; program: boolean;
  web: boolean; mobile: boolean; net: boolean; games: boolean;
  project: boolean; password: boolean;

  errorMessage: string;

  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private notificationsService: NotificationsService,
    private userService: UserService,
    private authService: AuthService,
    private zone: NgZone
  ) {
    /* from profile to games*
    
    this.cv = false;
    this.database = false; this.project= false; this.password= false;
    this.program= false; this.web= false; this.mobile= false; this.net= false; 
    this.games = false;

    /*this.listProfile = ([
      this.database = false, this.project= false, this.password= false, this.profile = true,
      this.program= false, this.web= false, this.mobile= false, this.net= false, this.games = false
    ]);*/
   }

  ngOnInit() {
  }

  /* from profile to games 
  activateProfile() {
    this.allFalse();
    if (!this.profile) {
      this.profile = !this.profile;
    }
    //console.log('profile is true');
  }

  activateCV() {
    this.allFalse();
    this.cv = !this.cv;
    //console.log('profile is false');
  }

  activateDatabase() {
    this.allFalse();
    this.database = !this.database;
  }

  activateProgramming() {
    this.allFalse();
    this.program = !this.program;
  }

  activateWeb() {
    this.allFalse();
    this.web = !this.web;
  }

  activateMobile() {
    this.allFalse();
    this.mobile = !this.mobile;
  }

  activateNet() {
    this.allFalse();
    this.net = !this.net;
  }

  activateGames() {
    this.allFalse();
    this.games = !this.games;
  }

  activateProject() {
    this.allFalse();
    this.project = true;
    this.router.navigate(['/mem/project-settings']);
  }

  activatePassword() {
    this.allFalse();
    this.password = !this.password;
  }

  allFalse() {
    /*for (let entry of this.listProfile) {
      entry = false;
      console.log(entry);
    }
    this.database = this.database; 
    this.project = this.project; 
    this.password = this.password; 
    this.profile = this.profile;
    this.program = this.program; 
    this.web = this.web; 
    this.mobile = this.mobile; 
    this.net = this.net; 
    this.games = this.games;
    this.cv = this.cv; 
    this.database = false; 
    this.project = false; 
    this.password = false; 
    this.profile = false;
    this.program = false; 
    this.web = false; 
    this.mobile = false; 
    this.net = false; 
    this.games = false;
    this.cv = false;
} 

  /*
    File upload functions 
  */ 

}
