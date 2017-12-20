import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Project } from 'app/models/project';
import { DataTableResource } from 'angular-4-data-table';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  projects: Project[];
  subscription: Subscription;
  tableResource: DataTableResource<Project>;
  items: Project[] = [];
  itemCount: number;
  constructor(private projectService: ProjectService) {
    this.subscription = this.projectService.getAllEmployerProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.initializeTable(projects);
      });
  }

  private initializeTable(projects: Project[]) {
    this.tableResource = new DataTableResource(projects);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
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

}
