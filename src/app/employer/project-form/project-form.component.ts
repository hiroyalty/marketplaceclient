import { ProjectCategoryService } from './../../services/projectcategory.service';
import { EnumDataService } from './../../services/enum-data.service';
import { ProjectService } from './../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Component, NgZone, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProjectStatusService } from 'app/services/project-status.service';
import { MatDatepicker } from '@angular/material';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'app/models/project';
import * as moment from 'moment';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  project: Project;
  statusVal;
  projectCategories;
  minDate;
  maxDate;
  generalInfo: boolean;
  additionalDocuments: boolean;
  aboutEmployer: boolean;
  applicantList: boolean;
  allProjects: boolean;
  enumVal;
  id;
  projectImage;
  errorMessage;
  loading: boolean = false;
  canLoadImage;
  notUnique: boolean = false;
  imageUrl;
  projectdocs: {};
  projectdocsuploadbutton: boolean = false;
  allProjectDocs;
  form; FormGroup;
  titleValue = '';
  @Input() projectTitle: string;
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
    this.createForm();
    
    this.maxDate = new Date(2027, 0, 1);
    this.generalInfo = true;

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      //console.log(this.id);
      this.projectService.getOne(this.id)
        .subscribe(p => {
           this.project = p;
           console.log(this.project)
           this.imageUrl = this.project.imageUrl;
           this.projectTitle = this.project.title;
           this.projectdocs = this.project.projectdocs;
           //console.log(this.projectdocs);
           this.form.setValue({
            title: this.project.title,
            'description': this.project.description,
            'category': this.project.category,
            'location': this.project.location,
            'url': this.project.url,
            'status'    : this.project.status,
            'projectlifespan'  : this.project.projectlifespan,
            'applicationdeadline' : this.project.applicationdeadline,
            'bigdataNoSQL' : this.project.bigdataNoSQL,
            'RelationalDB' : this.project.RelationalDB,
            'programming' : this.project.programming,
            'webdevelopment' : this.project.webdevelopment,
            'networking' : this.project.networking,
            'cloudcomputing' : this.project.cloudcomputing,
            'operatingsystem' : this.project.operatingsystem,
            'devices' : this.project.devices,
            'games' : this.project.games,
            'android' : this.project.android,
            'ios' : this.project.ios,
            'windowsphone' : this.project.windowsphone,
            'imageUrl' : this.project.imageUrl,
            //'image' : ''
          });

          //let aday = moment(this.project.applicationdeadline);
          //this.minDate = moment(aday).subtract(1, 'days').toISOString();
          //console.log(this.minDate); + -1*24*3600*1000
          //this.minDate = new Date(this.project.applicationdeadline);
          //this.minDate = new Date(aday.getDate() + -1*24*3600*1000);
          
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Project Load Failed', 'Oops!, we could not load project now try Again Later.');
        this.errorMessage = <any>errorMessage;
      });
    } /*else {
      this.minDate = new Date(Date.now() + -1*24*3600*1000);
      //this.minDate = new Date(Date.now());
    }*/
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

  createForm() {
    this.form = this.fb.group({
      title        : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      description  : ['', Validators.required],
      category : ['', Validators.required],
      location    : ['', Validators.required],
      url : [''],
      status    : ['', Validators.required],
      projectlifespan  : ['', Validators.required],
      applicationdeadline : ['', Validators.required],
      bigdataNoSQL : ['', Validators.required],
      RelationalDB : ['', Validators.required],
      programming : ['', Validators.required],
      webdevelopment : ['', Validators.required],
      networking : ['', Validators.required],
      cloudcomputing : ['', Validators.required],
      operatingsystem : ['', Validators.required],
      devices : ['', Validators.required],
      games : ['', Validators.required],
      android : ['', Validators.required],
      ios : ['', Validators.required],
      windowsphone : ['', Validators.required],
      imageUrl : [''],
      //image : null,
    });
  }

  save(project) {
    this.loading = true;
    if(this.projectImage == null && this.id == null) {
      this.notificationsService.notify("error", 'Image Required', 'Project Image is Required');
      this.loading = false;
      return;
    }
    this.projectTitle = this.form.get('title').value;
    
    const formModel = this.prepareSave();
    
    if (this.id) {
      //console.log(project);
      this.projectService.update(this.id, project)
      .subscribe(up => {
        this.project = up;
        //console.log(this.project);
        this.updateForm();
        this.notificationsService.notify("success", 'Update Successful', 
        'Project Update Successful');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Update Failed', 'Oops!, we could not update project now try Again Later.');
        this.errorMessage = <any>errorMessage;
      });
    //else this.projectService.create(formModel, project)
    } else { this.projectService.create(project)
      .subscribe(data => {
         this.projectService.uploadimage(this.projectTitle, formModel)
          .subscribe(data => {
            this.project = data;
            this.id = this.project._id;
            this.imageUrl = this.project.imageUrl;
            this.updateForm();
            this.notificationsService.notify("success", 'Creation Successful', 
              'Project Creation Successful');
          });
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Creation Failed', 'Project Title Already Taken, Use Another Title');
        this.errorMessage = <any>errorMessage;
        this.form.get('title').setErrors(this.errorMessage);
        //return;
      });
    }
      //this.form.reset();
      this.loading = false;
    //this.router.navigate(['/employer/projects']);*/
  }

  //delete the whole project with all its documents
  delete() {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.projectService.deleteProject(this.id);
    this.router.navigate(['/employer/myprojects']);
  }
  
  getFileimage(event) {
    this.projectImage = event.target.files[0];
    if(event.target.files.length > 0) {
      this.projectImage = event.target.files[0];
      //this.form.get('image').setValue(this.projectImage);
    }
  }
  
  ngOnInit() {
  }
  
  clearFile() {
    this.projectImage = null;
    //this.form.get('image').setValue(null);
    this.image.nativeElement.value = '';
  }

  updateProjectImage(event) {
    let dfile = this.imageUrl.split("/");
    let imageName = dfile[5];
    console.log(imageName);

    if(event.target.files.length > 0) {
      this.projectImage = event.target.files[0];
      let formdata = this.prepareSave();
      this.projectService.updateimage(this.projectTitle, imageName, formdata)
        .subscribe(data => {
          this.project = data;
          this.id = this.project._id;
          this.imageUrl = this.project.imageUrl;
          this.updateForm();
          this.notificationsService.notify("success", 'Update Successful', 
            'Image Update Successful');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Update Failed', 'Image Update Failed');
        this.errorMessage = <any>errorMessage;
      });
    } else {
      this.notificationsService.notify("info", 'Not Updated', 'No Image was Provided');
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('image', this.projectImage);
    //input.append('name', this.form.get('name').value);
    return input;
  }

  updateForm() {
    this.form.setValue({
      'title': this.project.title,
      'description': this.project.description,
      'category': this.project.category,
      'location': this.project.location,
      'url': this.project.url,
      'status'    : this.project.status,
      'projectlifespan'  : this.project.projectlifespan,
      'applicationdeadline' : this.project.applicationdeadline,
      'bigdataNoSQL' : this.project.bigdataNoSQL,
      'RelationalDB' : this.project.RelationalDB,
      'programming' : this.project.programming,
      'webdevelopment' : this.project.webdevelopment,
      'networking' : this.project.networking,
      'cloudcomputing' : this.project.cloudcomputing,
      'operatingsystem' : this.project.operatingsystem,
      'devices' : this.project.devices,
      'games' : this.project.games,
      'android' : this.project.android,
      'ios' : this.project.ios,
      'windowsphone' : this.project.windowsphone,
      'imageUrl' : this.project.imageUrl
    });
  }

  delInput(): void {
    const formControl = this.form.controls['image'];
    formControl.remove();
  }

  onKey(value: string) { // without type info
    //this.values += event.target.value;
    this.titleValue = value;
    console.log(this.titleValue);
  }

  activateAdditionalDocuments() {
    this.allFalse();
    this.additionalDocuments = true;
  }

  activateAboutEmployer() {
    this.allFalse();
    this.aboutEmployer = true;
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
    this.router.navigate(['/employer/myprojects']);
  }

  allFalse() {
    this.generalInfo = false;
    this.additionalDocuments = false;
    this.aboutEmployer = false;
    this.applicantList = false;
    this.allProjects = false;
  }

  getFiles(event, fmr: NgForm) {
    if(event.target.files.length > 4) {
      //this.allProjectDocs = event.target.files[0];
      this.notificationsService.notify("error", 'Files Exceeded', 
      'You can upload maximum of 4 Files');
      fmr.reset();
      return;
    }
    this.allProjectDocs = event.target.files;
    this.projectdocsuploadbutton = true;
    //console.log(this.allProjectDocs);
  }

  uploadprojectdocs(fmr: NgForm) {
    let formData = new FormData();
    const files: Array<File> = this.allProjectDocs;
    console.log(files);

    for(let i =0; i < files.length; i++){
      formData.append("projectdoc[]", files[i], files[i]['name']);
    }
    //formData.append('projectdoc', this.allProjectDocs);
    this.projectService.uploadFiles(this.projectTitle, formData)
    .subscribe(data => {
      console.log('files', data)
      //this.zone.run(() => {
        //let men = JSON.stringify(data);
      this.notificationsService.notify("success", 'Upload Successful', 
        'Project Documents Successfully uploaded');
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
      this.errorMessage = <any>errorMessage
    });
    fmr.reset();
  }

  refreshProjectDetails() {
    this.projectService.getOne(this.id)
      .subscribe(pdat => {
        this.project = pdat;
        this.zone.run(() => {
          //let men = JSON.stringify(data);
          //sessionStorage.setItem('currentUser', (men));
          this.updateForm();
          this.imageUrl = this.project.imageUrl;
          this.projectTitle = this.project.title;
          this.projectdocs = this.project.projectdocs;
        })
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
        this.errorMessage = <any>errorMessage
      });
  }
  //For image file of the project
  deleteFile(fileLink) {
    console.log(fileLink);
    let dfile = fileLink.split("/");
    let filename = dfile[5];
    this.projectService.deleteFile(filename)
      .subscribe(data => {
        this.zone.run(() => {
          this.project = data;
          this.notificationsService.notify("success", 'Delete Successful', 
            'File Deleted Successfully');
          })
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Delete Failed', 'File Deletion Failed');
        this.errorMessage = <any>errorMessage
    });
  }
  //For each additional file in the projectdocs array 
  deleteADoc(fileLink) {
    let dfile = fileLink.split("/");
    let filename = dfile[5];
    console.log(filename);
    this.projectService.deleteAdditionalDocument(this.id, filename)
      .subscribe(data => {
        this.zone.run(() => {
          this.project = data;
          this.notificationsService.notify("success", 'Delete Successful', 
            'File Deleted Successfully');
          })
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Delete Failed', 'File Deletion Failed');
        this.errorMessage = <any>errorMessage
    });
  }

  minsDate() {
    if(this.id) {
      console.log(this.minDate);
      let newDate = new Date(this.minDate);
      newDate.setDate(newDate.getDate() - 1);
      //console.log(newDate);
      this.minDate = newDate;
    } else {
      let newDate = new Date();
      this.minDate = newDate;
      //return newDate;
    }
  }

}