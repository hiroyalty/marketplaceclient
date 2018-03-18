import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from './../services/notifications.service';
import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import * as moment from 'moment';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id;
  //project: Project;
  project = <any>{};
  formatdate;
  errorMessage;
  projectdocs;
  loggedIn;
  checkMembership;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private userService: UserService,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
      if (this.id) {
        this.projectService.getOneProjectView(this.id).take(1)
          .subscribe(p => {
            this.project = p
            console.log(this.project);
            this.formatdate = moment(this.project.applicationdeadline).format("MMM Do YYYY");
            //this.formatdate = new Date(this.project.applicationdeadline).toString();
            this.projectdocs = this.project.projectdocs;
          },
          errorMessage => { 
            this.notificationsService.notify("error", 'Project Load Failed', 'Oops!, we could not load project now try Again Later.');
            this.errorMessage = <any>errorMessage;
          });
          
      }
   }
 
  ngOnInit() {
  }

  applyforproject() {
    this.loggedIn = this.authService.isLoggedIn();
    if(!this.loggedIn) {
      //console.log('not logged in');
      this.notificationsService.notify("error", 'Login First', 'Oops!, You can apply for this Project, after you login');
      return;
    }
    this.checkMembership = this.authService.userRole('member');
    if(!this.checkMembership) {
      //console.log('not a member');
      this.notificationsService.notify("error", 'Not Authorized', 'Oops!, You are not a member, confirm your membership email to apply.');
      return;
    }

    this.projectService.applyForProject(this.id)
      .subscribe(apply => {
         this.notificationsService.notify("success", 'Application Successful', 'Application Completed Successfully');
      },
      errorMessage => { 
        this.notificationsService.notify("info", 'Action Uncompleted', 
        'Oops!, Its like you already apply for this Project, or You can try again Later.');
        this.errorMessage = <any>errorMessage;
      });

  }


}