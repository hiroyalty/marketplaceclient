import { InterestedProject } from './../../models/interested-project';
import { MemberComponent } from '../member.component';
import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { EnumDataService } from './../../services/enum-data.service';
import { AppUser } from './../../models/app-user';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'app/services/user.service';
import { UsercategoryService } from './../../services/usercategory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: AppUser;
  userId: string;
  enumVal;
  errorMessage: string;
  listProfile;
  interestedproject;
  userPrefs: InterestedProject;
  cvupload;
  coverletterupload;
  usercv;
  usercoverletter;
  userFileLink = 'https://localhost:3000/userfiles/';
  /* from profile to games*/
  profile: boolean; 
  cv: boolean; database: boolean; program: boolean;
  web: boolean; mobile: boolean; net: boolean; games: boolean;
  project: boolean; changepassword: boolean;
  coverletteruploadbutton: boolean;
  cvuploadbutton: boolean;

  
  projectpref;
  /* Project Part Ends here */
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private notificationsService: NotificationsService,
    private enumValues: EnumDataService,
    private userService: UserService,
    private authService: AuthService,
    private zone: NgZone,
    ) 
    { 
    this.currentUser = this.authService.currentUser;
    this.userPrefs = this.authService.userPrefs;

    /* from profile to games*/
    this.profile = true; this.cv = false;
    this.database = false; this.project= false; this.changepassword= false;
    this.program= false; this.web= false; this.mobile= false; this.net= false; 
    this.games = false; this.coverletteruploadbutton = false; this.cvuploadbutton = false;
  }

  ngOnInit() {
    this.enumVal = this.enumValues.getEnumValues();
    this.usercv = this.currentUser.cv;
    this.usercoverletter = this.currentUser.coverletter;
  }

  /*
    Save the user object
  */
  save(f: NgForm) {
    console.log(f.value);
    this.userService.userUpdate(f.value)
      .subscribe(data => {
        this.zone.run(() => {
          let men = JSON.stringify(data);

          sessionStorage.setItem('currentUser', (men));
          this.currentUser = this.authService.currentUser;
          //console.log(JSON.stringify(data));
        this.notificationsService.notify("success", 'Update Successful', 
          'Your update is Successful');
        })
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
      this.errorMessage = <any>errorMessage
    });
  }

  updatePrefs(f: NgForm) {
    console.log(f.value);
    this.userService.userUpdatePrefs(this.currentUser.username, f.value)
      .subscribe(data => {
        this.zone.run(() => {
          let prefs = JSON.stringify(data);
          console.log(JSON.stringify(data));
          sessionStorage.setItem('userPrefs', (prefs));
          this.userPrefs = this.authService.userPrefs;
          //this.userPrefs = JSON.parse(sessionStorage.getItem('userPrefs'));
          
        this.notificationsService.notify("success", 'Update Successful', 
          'Your update is Successful');
        })
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
      this.errorMessage = <any>errorMessage
    });
  }

  /* End of profile to games*/
  activateProfile() {
    this.allFalse();
    this.profile = true;
    //console.log('profile is true');
  }

  activateCV() {
    this.allFalse();
    this.cv = true;
    //console.log('profile is false');
  }

  activateDatabase() {
    this.allFalse();
    this.database = true;
  }

  activateProgramming() {
    this.allFalse();
    this.program = true;
  }

  activateWeb() {
    this.allFalse();
    this.web = true;
  }

  activateMobile() {
    this.allFalse();
    this.mobile = true;
  }

  activateNet() {
    this.allFalse();
    this.net = true;
  }

  activateGames() {
    this.allFalse();
    this.games = true;
  }

  activateProject() {
    this.allFalse();
    this.project = true;
  }

  activatechangepassword() {
    this.allFalse();
    this.changepassword = true;
  }

  allFalse() {
    this.database = false; this.project= false; this.changepassword= false; this.profile = false;
    this.program= false; this.web= false; this.mobile= false; this.net= false; this.games = false;
    this.cv = false;
  }

  updatechangepassword(f: NgForm) {
    console.log(f.value);
    this.userService.updatePassword(f.value)
      .subscribe(data => {
        this.notificationsService.notify("success", 'Update Successful', 
          'Password update is Successful');
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
      this.errorMessage = <any>errorMessage
    });
  }

  getFiles(event) {
    //console.log(event.target.files[0]);
    this.cvupload = event.target.files[0];
    if(event.target.files.length > 0) {
      this.cvupload = event.target.files[0];
      //this.form.get('avatar').setValue(file);
    }
    this.cvuploadbutton = true;
  }

  getFilesCover(event) {
    //console.log(event.target.files[0]);
    this.coverletterupload = event.target.files[0];
    if(event.target.files.length > 0) {
      this.coverletterupload = event.target.files[0];
      //this.form.get('avatar').setValue(file);
    }
    this.coverletteruploadbutton = true;
  }

  getFilePicture(event) {
    let picturerr = event.target.files[0];
    if(event.target.files.length > 0) {
      picturerr = event.target.files[0];
      //console.log(picturerr);
      let formData = new FormData();
      formData.append('picture', picturerr);
      this.userService.uploadPicture(formData)
        .subscribe(data => {
          this.refreshUserDetails();
          this.notificationsService.notify("success", 'Update Successful', 
          'Picture Update Successful');
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
          this.errorMessage = <any>errorMessage
        });
    }
    
  }

  uploadCV(fmr: NgForm) {
    //console.log(this.cvupload);
    let formData = new FormData();
    formData.append('cv', this.cvupload);
    this.userService.uploadCV(formData)
    .subscribe(data => {
      fmr.reset();
      //this.zone.run(() => {
        //let men = JSON.stringify(data);

        //sessionStorage.setItem('currentUser', (men));
        //this.currentUser = this.authService.currentUser;
      this.notificationsService.notify("success", 'Update Successful', 
        'CV Successfully uploaded');
      //})
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
      this.errorMessage = <any>errorMessage
    });
  }

  uploadCoverletter(fmr: NgForm) {
    //console.log(this.cvupload);
    let formData = new FormData();
    formData.append('coverletter', this.coverletterupload);
    this.userService.uploadCoverletter(formData)
    .subscribe(data => {
      fmr.reset();
      //this.zone.run(() => {
        //let men = JSON.stringify(data);

        //sessionStorage.setItem('currentUser', (men));
        //this.currentUser = this.authService.currentUser;
      this.notificationsService.notify("success", 'Update Successful', 
        'Cover letter Successfully uploaded');
      //})
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
      this.errorMessage = <any>errorMessage
    });
  }

  refreshUserDetails() {
    this.userService.getUser(this.currentUser._id)
      .subscribe(data => {
        this.zone.run(() => {
          let men = JSON.stringify(data);

          sessionStorage.setItem('currentUser', (men));
          this.currentUser = this.authService.currentUser;
          this.usercv = this.currentUser.cv;
          this.usercoverletter = this.currentUser.coverletter;
        })
      },
      errorMessage => { 
      });
  }

  deleteFile(value) {
    let dfile = value.split("/");
    let filename = dfile[5];
    this.userService.deleteFile(filename)
      .subscribe(data => {
        this.zone.run(() => {
          let men = JSON.stringify(data);

          sessionStorage.setItem('currentUser', (men));
          this.currentUser = this.authService.currentUser;
        this.notificationsService.notify("success", 'Delete Successful', 
          'File Deleted Successfully');
        })
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Delete Failed', 'File Deletion Failed');
        this.errorMessage = <any>errorMessage
      });
  }

}