import { ProjectCategory } from '../models/project-category';
import { Http } from '@angular/http';
import { DataService } from 'app/services/data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectCategoryService extends DataService {

  constructor(http: Http) {
    super(http);
  }

  getAll() {
    return super.getAll(this.baseUrl + '/projectcategory');
  }

  getOne(id: string) {
    return super.getOne(this.baseUrl + '/projectcategory/getone', id);
  }

  create(pcategory: ProjectCategory) {
    return super.create(this.baseUrl + '/projectcategory/create', pcategory);
  }

  delete(id: string) {
    let link = this.baseUrl + '/projectcategory';
    return super.delete(link, id);
  }

  updateProjectCategory(id, category) {
    let link = this.baseUrl + '/project/category' + id;
    return super.update(link, category);
  }

  /*
  update(user: User) {
    return this.http.put('/users/' + user._id, user);
  }
  */

}
