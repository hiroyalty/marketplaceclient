import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/services/notifications.service';
import { ProjectStatusService } from 'app/services/project-status.service';
import { ProjectCategoryService } from 'app/services/projectcategory.service';
import { EnumDataService } from 'app/services/enum-data.service';
import { UserService } from 'app/services/user.service';
import { ProjectService } from 'app/services/project.service';
import { AuthService } from 'app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { ValidationManager } from 'ng2-validation-manager';
import { Project } from '../models/project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  form;
  userValues;
  maxDate;
  loading: boolean = false;
  projectTitle;
  projectImage;
  project: Project;
  //project: any = {};
  id;
  imageUrl;
  adminUserRole: boolean = false;
  errorMessage;
  enumVal;
  statusVal;
  projectCategories;

  generalInfo: boolean;
  additionalDocuments: boolean;
  applicantList: boolean;
  projectAwardee: boolean;
  messageTrail: boolean;
  allProjects: boolean;

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @ViewChild('image') image: ElementRef;

  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private notificationsService: NotificationsService,
    private statusValues: ProjectStatusService,
    private projectCategoryValues: ProjectCategoryService,
    private enumValues: EnumDataService,
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthService,
    private zone: NgZone,
    private fb: FormBuilder
  ) { 
    this.adminUserRole = this.authService.userRole('admin');

    this.maxDate = new Date(2027, 0, 1);

    this.generalInfo = true;

    this.enumVal = this.enumValues.getEnumValues();
    this.statusVal = this.statusValues.getStatusValues();
    this.projectCategoryValues.getAll()
      .subscribe(data => {
        this.projectCategories = data;
        //this.notificationsService.notify("success", 'Loading Successful', 
          //'Load Project Category Successfully');
      },
      errorMessage => { 
        //this.notificationsService.notify("error", 'Unauthorized', 'Could not load Project Categories');
        //this.errorMessage = <any>errorMessage
    });
  }

  ngOnInit() {
    this.form = new ValidationManager({
      'title' : 'required|minLength:4|maxLength:150|alphaSpace',
      'introDescription': 'required',
      'description': 'required',
      'category': 'required',
      'diffilcultyLevel': 'required',
      'location': 'required',
      'url': 'required',
      'status': 'required',
      'projectlifespan': 'required',
      'applicationdeadline': 'required',
      'bigdataNoSQL': 'required',
      'RelationalDB': 'required',
      'programming': 'required',
      'webdevelopment': 'required',
      'networking': 'required',
      'cloudcomputing': 'required',
      'operatingsystem': 'required',
      'games': 'required',
      'devices': 'required',
      'android': 'required',
      'ios': 'required',
      'windowsphone': 'required'
    });

    this.form.setValue({
    });

    this.form.setErrorMessage('title', 'minLength', 'Title must not be less than four characters');
  }
 
  save() {
    this.loading = true;
    if(this.projectImage == null) {
      this.notificationsService.notify("error", 'Image Required', 'Project Image is Required');
      this.loading = false;
      return;
    }
    if(this.form.isValid()){
      this.userValues = this.form.getData();
      console.log(this.userValues);
      
      this.projectTitle = this.userValues.title; 

      this.projectService.create(this.userValues)
      .subscribe(da => {
        this.project = da;

      }, 
      errorMessage => { 
        this.notificationsService.notify("error", 'Creation Failed', 'Project Title Already Taken, Use Another Title');
        this.errorMessage = <any>errorMessage;
        this.form.get('title').setErrors(this.errorMessage);
        return;
      });
      console.log(this.projectTitle);
      const formModel = this.prepareSave();
      this.projectService.uploadimage(this.projectTitle, formModel)
        .subscribe(data => {
        this.project = data; 
        //this.id = this.project._id;
        this.imageUrl = this.project.imageUrl;
        this.notificationsService.notify("success", 'Creation Successful', 
        'Project Creation Successful');
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Creation Failed', 'Internal Error');
          this.errorMessage = <any>errorMessage;
          //this.form.get('title').setErrors(this.errorMessage);
          //return;
        });

      this.loading = false;
      if(this.adminUserRole) {
        this.router.navigate(['/admin/myprojects']);
      } else {
      this.router.navigate(['/employer/myprojects']);
      }
    }

    this.loading = false;
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('image', this.projectImage);
    //input.append('name', this.form.get('name').value);
    return input;
  }

  getFileimage(event) {
    this.projectImage = event.target.files[0];
    if(event.target.files.length > 0) {
      this.projectImage = event.target.files[0];
      //this.form.get('image').setValue(this.projectImage);
    }
  }

  clearFile() {
    this.projectImage = null;
    //this.form.get('image').setValue(null);
    this.image.nativeElement.value = '';
  }

  activateAdditionalDocuments() {
    this.allFalse();
    this.additionalDocuments = true;
  }

  activateGeneralInfo() {
    this.allFalse();
    this.generalInfo = true;
  }

  activateApplicantList() {
    this.allFalse();
    this.applicantList = true;
  }

  activateAllProjects() {
    this.allFalse();
    this.allProjects = true;
    if(this.adminUserRole) {
      this.router.navigate(['/admin/myprojects']);
    } else {
      this.router.navigate(['/employer/myprojects']);
    }
  }

  activateprojectAwardee() {
    this.allFalse();
    this.projectAwardee = true;
  }

  activatemessageTrail() {
    this.allFalse();
    this.messageTrail = true;
  }

  allFalse() {
    this.generalInfo = false;
    this.additionalDocuments = false;
    this.applicantList = false;
    this.projectAwardee = false;
    this.messageTrail = false;
    this.allProjects = false;
  }

  save2(){ 
    if(this.form.isValid()){
      alert('validation pass');
      //this.removeFormGroup();
      this.project = this.form.getData();
      //this.usermodel['role'] = this.userrole;
      console.log(this.project);
      //this.form.reset();
    }
  }
}
