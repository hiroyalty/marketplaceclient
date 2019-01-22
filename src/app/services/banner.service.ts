import { Banner } from './../models/banner';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class BannerService extends DataService{

  constructor(http: Http) {
    super(http);
  }

  getBanner() {
    return super.getAll(this.baseUrl + '/banner/getbanner');
  }
  
  getBannerNoOptions() {
    return super.getAll(this.baseUrl + '/banner/getbanner');
  }

  create(banner: Banner) {
    return super.create(this.baseUrl + '/banner/create', banner);
  }

  update(bannerid, banner) {
    return super.update(this.baseUrl + '/banner/update/' + bannerid, banner)
  }

  uploadImage(btitle, formdata) {
    return this.http.post(this.baseUrl + '/banner/uploadImage/' + btitle, formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }

  updateImage(btitle, imagename, formdata) {
    return this.http.post(this.baseUrl + '/banner/updateImage/' + btitle + '/' + imagename, formdata, this.getOtherOptions())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); }) ;
  }
  

}
