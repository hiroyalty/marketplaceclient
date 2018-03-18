import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './../models/project';
import { AuthService } from './../services/auth.service';
import { UserService } from 'app/services/user.service';
import { NotificationsService } from './../services/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from 'app/models/app-user';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  projects: Project[];
  subscription: Subscription;
  tableResource: DataTableResource<Project>;
  items: Project[] = [];
  itemCount: number;
  errorMessage;
  
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private notificationsService: NotificationsService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private zone: NgZone
  ) {
    this.subscription = this.projectService.getAllMemberProjects()
    .subscribe(projects => {
      this.projects = projects;
      this.initializeTable(projects);
    });
}

private initializeTable(projects: Project[]) {
  if(projects.length > 0) {
  this.tableResource = new DataTableResource(projects);
  this.tableResource.query({ offset: 0 })
    .then(items => this.items = items);
  this.tableResource.count()
    .then(count => this.itemCount = count);
  }
}

reloadItems(params) {
  if(!this.tableResource) return;

  this.tableResource.query(params)
  .then(items => this.items = items);
}

filter(query: string) {
  let filteredProjects = (query) ?
    this.projects.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.projects;

  this.initializeTable(filteredProjects);
}
//3 ways of dealing with our objects are:
//1. declare an observable in component and use async pipe to unwrap on the template.
//2. take one operator on the observable and just display it on the template
//3. use the subscription object and unsubscribe when we done.
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
 
refreshProjects(){
  this.subscription = this.projectService.getAllMemberProjects()
    .subscribe(projects => {
      this.projects = projects;
      this.initializeTable(projects);
  });
}

deleteProject(item) {
  console.log(item);
  //this.projects.splice()
  this.projectService.deleteProject(item._id, item.postedBy.username)
   .subscribe(dat => {
    this.notificationsService.notify("success", 'Deletion Successful', 
    'Project Deletion Successful');
  },
  errorMessage => { 
    this.notificationsService.notify("error", 'Deletion Failed', 'Project Deletion Failed');
    this.errorMessage = <any>errorMessage;
  });
  this.refreshProjects();
}

ngOnInit() {
}
  
}
