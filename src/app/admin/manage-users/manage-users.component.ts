import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'app/services/notifications.service';
import { AppUser } from 'app/models/app-user';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: AppUser[]; //same as items
  subscription: Subscription;
  errorMessage: string;
  tableResource: DataTableResource<AppUser>;
  items: AppUser[] = [];
  itemCount: number;
  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService) { 
      this.subscription = this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        this.initializeTable(users);
      },
      errorMessage => { 
        this.notificationsService.notify("info", 'Unauthorized', 'You do not have access to this service');
        this.errorMessage = <any>errorMessage
      });
    }

  private initializeTable(users: AppUser[]) {
    this.tableResource = new DataTableResource(users);
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
    let filteredUsers = (query) ?
      this.users.filter(u => u.username.toLowerCase().includes(query.toLowerCase())) : 
      this.users;
    
    this.initializeTable(filteredUsers);
  }

  deleteUser(user: AppUser) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    this.users.splice(
      this.users.indexOf(user), 1
    );
    this.userService.delete(user._id).subscribe(() => {
      this.notificationsService.notify("success", 'Deleted', 'User Successfully removed');
      this.initializeTable(this.users) 
    });
  }

  private loadAllUsers() {
    this.subscription = this.userService.getAllUsers().subscribe(users => { 
      this.users = users; 
      this.initializeTable(users);
    },
    errorMessage => { 
      this.notificationsService.notify("info", 'Unauthorized', 'You do not have access to this service');
      this.errorMessage = <any>errorMessage
    });
  }

  refreshUsers() {
    this.loadAllUsers();
  }
  
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
