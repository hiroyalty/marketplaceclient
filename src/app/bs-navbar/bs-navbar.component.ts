import { AppUser } from './../models/app-user';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProjectCategoryService } from 'app/services/projectcategory.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit {
  user$: AppUser;
  projectCategories;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private projectCategoryValues: ProjectCategoryService) 
    { 
      this.projectCategoryValues.getAll()
      .subscribe(data => {
        this.projectCategories = data;
      },
      errorMessage => { 
      });
  }

  ngOnInit() {
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  checkUserRole(role){
    let isRole = this.authService.userRole(role);
    return isRole;
  }

  get currentUser() {
    return this.authService.currentUser;
    //this.user = this.authService.currentUser();
    //return this.user;
  }


} 
