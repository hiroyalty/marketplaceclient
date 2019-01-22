import { Banner } from './../models/banner';
import { BannerService } from './../services/banner.service';
import { ProjectCategory } from './../models/project-category';
import { ValidationManager } from 'ng2-validation-manager';
import { NotificationsService } from './../services/notifications.service';
import { ProjectCategoryService } from '../services/projectcategory.service';
import { UsercategoryService } from './../services/usercategory.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Usercategory } from 'app/models/usercategory';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ucategories: Usercategory[];
  pcategories: ProjectCategory[];
  projectcategory: ProjectCategory;
  banner : any = {};
  form;
  usercategory = {};
  errorMessage: string;
  constructor(
    private userCategoryService: UsercategoryService,
    private projectCategoryService: ProjectCategoryService,
    private bannerService: BannerService,
    private notificationsService: NotificationsService,
    private zone: NgZone) {
      this.userCategoryService.getAll()
      .subscribe(ucategories => this.ucategories = ucategories);

      this.projectCategoryService.getAll()
        .subscribe(pcategories => this.pcategories = pcategories);

      this.bannerService.getBanner()
        .subscribe(dat => {
          this.banner = dat;
          //console.log(this.banner)
        },
        errorMessage => { 
          //this.notificationsService.notify("error", 'Deletion Failed', 'Project Deletion Failed');
          this.errorMessage = <any>errorMessage;
        });
  }

  //here we manage both user and project category.
  ngOnInit() {
    this.form = new ValidationManager({
      'pctitle'        : 'required|minLength:2|maxLength:40|alphaSpace',
      'pcdescription'  : 'required',
      'subcategories'   : [
        new ValidationManager({
          'subcategory': 'required',
        })
      ],
    });
  } 
/*  
  Banner Part
*/
  createBanner(fbb: NgForm) {
    let mainbanner = fbb.value;
    this.bannerService.create(mainbanner)
      .subscribe(data => {
        this.banner = data;
        
        this.notificationsService.notify("success", 'Banner Created', 
          'A new Front Banner has been Created');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Operation Failed', 'Front Banner Creation Failed');
        this.errorMessage = <any>errorMessage
      });
      //fbb.reset();
  }

  updateBanner(fbb: NgForm) {
    let mainbanner = fbb.value;
    this.bannerService.update(this.banner._id, mainbanner)
      .subscribe(data => {
        this.banner = data;
        
        this.notificationsService.notify("success", 'Banner Updated', 
          'Front Banner has been Updated');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Operation Failed', 'Front Banner Update Failed');
        this.errorMessage = <any>errorMessage
      });
      //fbb.reset();
  }

  getFileImageLink(event) {
    let picturerr = event.target.files[0];
    if(event.target.files.length > 0) {
      picturerr = event.target.files[0];
      //console.log(picturerr);
      let formData = new FormData();
      formData.append('imageLink', picturerr);
      this.bannerService.uploadImage(this.banner.btitle, formData)
        .subscribe(data => {
          //this.banner = data;
          //this.refreshBannerDetails();
          this.notificationsService.notify("success", 'Update Successful', 
          'Picture Update Successful');
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
          this.errorMessage = <any>errorMessage
        });
    }
  }
 
  updateFileImageLink(event) {
    let dfile = this.banner.imageLink.split("/");
    let filename = dfile[5];

    let picturerr = event.target.files[0];
    if(event.target.files.length > 0) {
      picturerr = event.target.files[0];
      //console.log(picturerr);
      let formData = new FormData();
      formData.append('imageLink', picturerr);
      this.bannerService.updateImage(this.banner.btitle, filename, formData)
        .subscribe(data => {
          //this.banner = data;
          //this.refreshBannerDetails();
          this.notificationsService.notify("success", 'Update Successful', 
          'Picture Update Successful');
        },
        errorMessage => { 
          this.notificationsService.notify("error", 'Upload Failed', 'Your Upload Failed');
          this.errorMessage = <any>errorMessage
        });
    }
  }

  refreshBannerDetails() {
    this.bannerService.getBanner()
      .subscribe(data => {
        this.zone.run(() => {
          //this.banner = JSON.stringify(data);
          this.banner = data;
        })
      },
      errorMessage => { 
      });
  }

  createUserCategory(f: NgForm) {
    let usercategory = f.value;
    this.userCategoryService.create(usercategory)
      .subscribe(data => {
        this.ucategories.push(usercategory);
        
        this.notificationsService.notify("success", 'Category Created', 
          'A new User Category has been Created');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Operation Failed', 'User Category Creation Failed');
        this.errorMessage = <any>errorMessage
      });
      f.reset();
  }

  deleteUserCategory(ucategory) {
    this.ucategories.splice(
      this.ucategories.indexOf(ucategory), 1
    );
    this.userCategoryService.delete(ucategory.title)
      .subscribe(data => {
      this.notificationsService.notify("success", 'Category Deleted', 
        'User Category Deleted');
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Operation Failed', 'User Category Deletion Failed');
      this.errorMessage = <any>errorMessage
    });
  }


  //Project Category Section/////
  createProjectCategory() {
    if(this.form.isValid()){
      console.log(this.form.getData());
      this.projectcategory = this.form.getData();
      this.projectCategoryService.create(this.projectcategory)
      .subscribe(data => {
        this.pcategories.push(this.projectcategory);

        this.notificationsService.notify("success", 'Category Created', 
          'A new Project Category has been Created');
      },
      errorMessage => { 
        this.notificationsService.notify("error", 'Operation Failed', 'Project Category Creation Failed');
        this.errorMessage = <any>errorMessage
      });
      this.form.reset();
      }
  }
  
  addSubCategory() {
    this.form.addChildGroup('subcategories', new ValidationManager(
      {'subcategory': { rules: 'required' }}
    ) 
    );
  }

  removeSubCategory(i: number) {
    this.form.removeChildGroup('subcategories', i);
  }

  deleteProjectCategory(pcategory) {
    this.pcategories.splice(
      this.ucategories.indexOf(pcategory), 1
    );
    this.projectCategoryService.delete(pcategory.pctitle)
      .subscribe(data => {
      this.notificationsService.notify("success", 'Category Deleted', 
        'Project Category Deleted');
    },
    errorMessage => { 
      this.notificationsService.notify("error", 'Operation Failed', 'Project Category Deletion Failed');
      this.errorMessage = <any>errorMessage
    });
  }


}
