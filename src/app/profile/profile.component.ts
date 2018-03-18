import { UserService } from 'app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';
import { EnumDataService } from 'app/services/enum-data.service';
import { AuthService } from 'app/services/auth.service';
import { AppUser } from 'app/models/app-user';
import { InterestedProject } from 'app/models/interested-project';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //userFileLink = 'https://localhost:3000/userfiles/';
  adminCheck;
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
  userRole;
  completedProjects: Project[] = [];
  ongoingProjects: Project[] = [];
  allEmployerProjects: Project[] = [];
  stylesObj = {width: '15rem'};
 
  constructor(
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private enumValues: EnumDataService,
    private userService: UserService,
    private authService: AuthService,
    private projectService: ProjectService
  ) { 
    this.userId = this.route.snapshot.paramMap.get('id');
    this.adminCheck = this.authService.userRole('admin');
    if (this.userId) {
      this.userService.getUser(this.userId)
        .subscribe(data => {
          this.currentUser = data;
          console.log(this.currentUser);
          this.userRole = this.currentUser.role;
          console.log(this.userRole);
          //this.notificationsService.notify("success", 'Update Successful', 'Your update is Successful');

        }, 
        errorMessage => { 
          this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
          this.errorMessage = <any>errorMessage
        });
      this.userService.getProjectPref(this.userId)
        .subscribe(pref => {
          this.userPrefs = pref;
          console.log(this.userPrefs);
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
          this.errorMessage = <any>errorMessage
        });
    } else {
      this.currentUser = this.authService.currentUser;
      this.userPrefs = this.authService.userPrefs;
      this.userId = this.currentUser._id;
      console.log(this.currentUser);
      console.log(this.userPrefs);
      this.userRole = this.currentUser.role;
      console.log(this.userRole); 
    }
  }
 
  ngOnInit() {
    //this.projectService.getAll().subscribe(projects => {
    if(this.userRole === 'member' || 'user') {
      this.projectService.getCompletedProjectByMember(this.userId)
        .subscribe(projects => {
        this.completedProjects = projects;
        console.log(this.completedProjects);
      });
      //this.projectService.getAll().subscribe(projects => {
      this.projectService.getOngoingProjectByMember(this.userId)
        .subscribe(projects => {
          this.ongoingProjects = projects;
          console.log(this.ongoingProjects);
      });
    }
    if(this.userRole === 'employer') {
    this.projectService.getAllEmployerProjectsById(this.userId)
      .subscribe(projects => {
        this.allEmployerProjects = projects;
        console.log(this.allEmployerProjects);
    });
    }

  }
   
}
