import { NotificationsService } from './../../services/notifications.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Project } from 'app/models/project';
import { DataTableResource } from 'angular-4-data-table';
import { ProjectService } from 'app/services/project.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  adminUserRole; boolean;
  user: {};
  projects: Project[];
  subscription: Subscription;
  tableResource: DataTableResource<Project>;
  items: Project[] = [];
  itemCount: number;
  currentRoute;
  errorMessage;
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router) {

    this.currentRoute = this.router.url;
    
    this.user = this.authService.currentUser;
    this.adminUserRole = this.authService.userRole('admin');

    if(this.adminUserRole && this.currentRoute == '/admin/projects') {
    this.subscription = this.projectService.getotherprojectsforadmin()
      .subscribe(projects => {
        this.projects = projects;
        this.initializeTable(projects);
      });
    } else if (this.adminUserRole && this.currentRoute == '/admin/myprojects') {
      this.subscription = this.projectService.getAdminProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.initializeTable(projects);
      });
    } else {
      this.subscription = this.projectService.getAllEmployerProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.initializeTable(projects);
      });
    }

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
 
  ngOnInit() {
  }

  refreshProjects() {
    if(this.adminUserRole && this.currentRoute == '/admin/projects') {
      this.subscription = this.projectService.getotherprojectsforadmin()
        .subscribe(projects => {
          this.projects = projects;
          this.initializeTable(projects);
        });
      } else if (this.adminUserRole && this.currentRoute == '/admin/myprojects') {
        this.subscription = this.projectService.getAdminProjects()
        .subscribe(projects => {
          this.projects = projects;
          this.initializeTable(projects);
        });
      } else {
        this.subscription = this.projectService.getAllEmployerProjects()
        .subscribe(projects => {
          this.projects = projects;
          this.initializeTable(projects);
        });
      }
  }

  deleteProject(item){
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
 
}
