import { AppUser } from 'app/models/app-user';
import { AuthService } from './../../services/auth.service';
import { appConfig } from './../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import 'rxjs/add/operator/take';
import { UsercategoryService } from 'app/services/usercategory.service';

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
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private userCategoryService: UsercategoryService, // To be able to preload the category service into our form.
    private authService: AuthService,
    private userService: UserService,) { 
      this.userCategoryService.getAll()
      .subscribe(ucategories => this.ucategories = ucategories);
      
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.userService.getUser(this.id).take(1).subscribe(u => this.user = u);
      
    }

    save(user) {
      if (this.id) this.userService.update(this.id, user);
      //else this.userService.create(user);
  
      this.router.navigate(['/admin/manage-users']);
    }

    uploadPicture() {
    }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

}
