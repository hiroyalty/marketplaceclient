import { Component, OnInit } from '@angular/core';
import { Project } from 'app/models/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/services/project.service';
import { ProjectCategoryService } from 'app/services/projectcategory.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  category: string;

  constructor(private route: ActivatedRoute, 
    private projectService: ProjectService,
    private projectCategoryService: ProjectCategoryService) { 
    
  }

  ngOnInit() {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProjects = (this.category) ?
          this.projects.filter(p => p.category === this.category) :
          this.projects;
      })
    });

    //this.categories$ = this.projectCategoryService.getAll();
  }

}
