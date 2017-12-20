import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService extends DataService {

  constructor(http: Http) {
    super(http);
  }
 
  create(formdata) {
    return super.createComplex(this.baseUrl + '/projects/create', formdata)
  }

  getOne(id) {
    //return super.getOne(this.baseUrl + '/projects/getone', id);
    return this.http.get(this.baseUrl + '/projects/getone' + '/' + id, this.getOtherOptions())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  getAll() {
    return super.getAll(this.baseUrl + '/projects/getall');
  }

  getAllEmployerProjects() {
    return super.getAll(this.baseUrl + '/projects/getemployerprojects');
  }

  deleteProject(id: string) {
    //return this.http.delete('/projectId, projects/' + _id);
    let link = this.baseUrl + '/projects/remove';
    return super.delete(link, id);
  }
  
  update(projectId, project) {
    //return super.put(this.baseUrl + '/projects/update/' + projectId, project);
    return super.postData(this.baseUrl + '/projects/update/' + projectId, project); 
  }

  uploadimage(projectTitle, formdata) {
    return this.http.post(this.baseUrl + '/projects/loadimage/' + projectTitle, formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }

  updateimage(projectTitle, imageName, formdata) {
    return this.http.post(this.baseUrl + '/projects/updateimage/' + projectTitle + '/' + imageName, formdata, this.getOtherOptions())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); }) ;
  }

  uploadFiles(projectTitle, formdata) {
    //return super.upload(this.baseUrl + 'projects/loadfiles/' + projectId, formdata);
    return this.http.post(this.baseUrl + '/projects/loadfiles/' + projectTitle, formdata, this.getOtherOptions())
    .map(files => files.json())
    .catch(error => { return this.handleError(error); }) ;
  }

  checkTitle(title) {
    return super.postData(this.baseUrl + '/projects/checktitle', title)
    .catch(error => { return this.handleError(error); }) ;
  }

  deleteFile(filename: string) {
    let link = this.baseUrl + '/projects/deletefile';
    return super.deleteFile(link, filename);
  }

  deleteAdditionalDocument(projectId, filename) {
    let link = this.baseUrl + '/projects/deletefile/' + projectId;
    return super.deleteFile(link, filename);
    //return super.postData(link, filename);
  }
}
