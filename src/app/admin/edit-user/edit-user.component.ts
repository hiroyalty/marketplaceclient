import { NgForm } from '@angular/forms';
import { UserStatusService } from './../../services/user-status.service';
import { AppUser } from 'app/models/app-user';
import { AuthService } from './../../services/auth.service';
import { appConfig } from './../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import 'rxjs/add/operator/take';
import { UsercategoryService } from 'app/services/usercategory.service';
import { InterestedProject } from 'app/models/interested-project';
import { Project } from 'app/models/project';
import { NotificationsService } from 'app/services/notifications.service';
import { EnumDataService } from 'app/services/enum-data.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user = {};
  id;
  ucategories;
  currentUser: AppUser;
  //currentUser: any={};
  userId: string;
  statusVal;
  errorMessage: string;
  listProfile;
  interestedproject;
  userPrefs: InterestedProject;
  cvupload;
  coverletterupload;
  usercv;
  usercoverletter;
  role;
  status;
  completedProjects: Project[] = [];
  ongoingProjects: Project[] = [];
  allEmployerProjects: Project[] = [];
  stylesObj = {width: '15rem'};
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private userCategoryService: UsercategoryService, // To be able to preload the category service into our form.
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private userStatus: UserStatusService,
    private projectService: ProjectService,
    private userService: UserService,) { 
      this.userCategoryService.getAll()
      .subscribe(ucategories => this.ucategories = ucategories);
      
      this.userId = this.route.snapshot.paramMap.get('id');
      if (this.userId) {
        this.userService.getUser(this.userId)
        //.take(1) 
        .subscribe(data => {
          this.currentUser = data;
          //console.log(this.currentUser);
          this.role = this.currentUser.role;
          this.status = this.currentUser.status;
          //console.log(this.role);
          //this.user = this.currentUser;
          //this.notificationsService.notify("success", 'Update Successful', 'Your update is Successful');

        }, 
        errorMessage => { 
          this.notificationsService.notify("error", 'Update Failed', 'Your Update Failed');
          this.errorMessage = <any>errorMessage
        });
        if(this.role == 'member') {
        this.userService.getProjectPref(this.userId)
          .subscribe(pref => {
            this.userPrefs = pref;
            //console.log(this.userPrefs);
          },
          errorMessage => {  
            this.notificationsService.notify("error", 'Pref Failed', 'Your Update Failed');
            this.errorMessage = <any>errorMessage
          });
      }
    } else {
      this.currentUser = this.authService.currentUser;
      this.userPrefs = this.authService.userPrefs;
      this.userId = this.currentUser._id; //Error could be here
      //this.user = this.currentUser;
      console.log(this.currentUser);
      console.log(this.userPrefs);
      this.role = this.currentUser.role;
      this.status = this.currentUser.status;
      //console.log(this.role); 
    }  
  }

    save(f: NgForm) {
      if(f.value.role == '' && f.value.status == '') {
        this.notificationsService.notify("info", 'No Changes', 'No changes in user details');
        return;
      }
      this.userService.adminUpdateUser(this.userId, f.value)
        .subscribe(data => {
          this.currentUser = data;
          this.notificationsService.notify("success", 'Success', 'user details updated');
        },
        errorMessage => {  
          this.notificationsService.notify("error", 'Failure', 'user details update failed');
          this.errorMessage = <any>errorMessage
        });
      //this.router.navigate(['/admin/manage-users']);
    }
 
    deleteUser() {
      if (!confirm('Are you sure you want to delete this user?')) return;
      
      //this.users.splice(
      //  this.users.indexOf(user), 1
      //);
      this.userService.delete(this.userId).subscribe(() => {
        this.notificationsService.notify("success", 'Deleted', 'User Successfully removed');
        this.router.navigate(['/admin/manage-users']);
      });
    }


    ngOnInit() {
      //this.projectService.getAll().subscribe(projects => {
      if(this.role === 'member' || 'user') {
        this.projectService.getCompletedProjectByMember(this.userId)
          .subscribe(projects => {
          this.completedProjects = projects;
          //console.log(this.completedProjects);
        });
        //this.projectService.getAll().subscribe(projects => {
        this.projectService.getOngoingProjectByMember(this.userId)
          .subscribe(projects => {
            this.ongoingProjects = projects;
            //console.log(this.ongoingProjects);
        });
      }
      if(this.role === 'employer') {
      this.projectService.getAllEmployerProjectsById(this.userId)
        .subscribe(projects => {
          this.allEmployerProjects = projects;
          //console.log(this.allEmployerProjects);
      });
      }
      this.statusVal = this.userStatus.getUserStatusValues();
      //console.log(this.statusVal);
    }
 
}
