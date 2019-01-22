import { Usercategory } from './../models/usercategory';
import { DataService } from 'app/services/data.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UsercategoryService extends DataService{

  constructor(http: Http) {
    super(http);
  }

  getAll() {
    return super.getAll(this.baseUrl + '/usercategory');
  }

  getOne(title: string) {
    return super.getOne(this.baseUrl + '/usercategory/getone', title);
  }
  
  create(category: Usercategory) {
    return super.create(this.baseUrl + '/usercategory/create', category);
  }

  delete(id: string) {
    let link = this.baseUrl + '/usercategory';
    return super.delete(link, id);
  }

}
 