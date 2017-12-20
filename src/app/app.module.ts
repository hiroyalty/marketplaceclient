import { ProjectStatusService } from './services/project-status.service';
import { ProjectService } from './services/project.service';
import { EnumDataService } from './services/enum-data.service';
import { ProjectCategoryService } from './services/projectcategory.service';
import { UsercategoryService } from './services/usercategory.service';
import { NotificationsService } from './services/notifications.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, MatInputModule } from '@angular/material';

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table/dist';
import { CustomFormsModule } from 'ng2-validation';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { EmployerComponent } from './employer/employer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { EmployerAuthGuard } from './services/employer-auth-guard.service';
import { OrderService } from './services/order.service';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrowlModule, SharedModule, MessagesModule } from 'primeng/primeng';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertComponent } from './alert/alert.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { MemberComponent } from './member/member.component';
import { SettingsComponent } from './member/settings/settings.component';
import { MemberAuthGuard } from 'app/services/member-auth-guard.service';
import { ProjectInterestComponent } from './member/settings/project-interest/project-interest.component';
import { ProjectFormComponent } from './employer/project-form/project-form.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}
 
@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
    EmployerComponent,
    BsNavbarComponent,
    FooterComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AlertComponent,
    NotificationsComponent,
    ManageUsersComponent,
    EditUserComponent,
    SettingsComponent,
    ProjectInterestComponent,
    ProjectFormComponent,
    ProjectCardComponent,
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    GrowlModule,
    SharedModule,
    MessagesModule,
    DataTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin/manage-users', 
      component: ManageUsersComponent,
      canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { path: 'admin/edit-user/:id', 
      component: EditUserComponent, 
      canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { path: 'employer/myprojects', 
      component: EmployerComponent, 
      canActivate: [AuthGuard, EmployerAuthGuard] 
      },
      { 
        path: 'employer/projects/new', 
        component: ProjectFormComponent, 
        canActivate: [AuthGuard, EmployerAuthGuard]
      },
      { 
        path: 'employer/edit-project/:id', 
        component: ProjectFormComponent, 
        canActivate: [AuthGuard, EmployerAuthGuard]
      },
      { path: 'mem/mysettings', 
      component: SettingsComponent, 
      canActivate: [AuthGuard, MemberAuthGuard] 
      }, 
      { path: 'mem/project-settings', 
      component: ProjectInterestComponent, 
      canActivate: [AuthGuard, MemberAuthGuard] 
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'confirmaccount/:category/:username', component: ConfirmAccountComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'resetpassword/:utoken', component: ResetPasswordComponent },
      { path: 'projectdetails/:id', component: ProjectDetailsComponent},
      //{ path: 'aboutteams', component: LoginComponent },
      //{ path: 'aboutemployers', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
      {
        path: '**', 
        component: NotFoundComponent
      },
    ])
  ],
  providers: [
    OrderService,
    AuthService,
    AuthGuard,
    UserService,
    ProjectService,
    AdminAuthGuard,
    EmployerAuthGuard,
    MemberAuthGuard,
    NotificationsService,
    AlertService,
    EnumDataService,
    ProjectStatusService,
    UsercategoryService,
    ProjectCategoryService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
