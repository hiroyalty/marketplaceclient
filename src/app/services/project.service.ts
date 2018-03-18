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
    return super.createComplex(this.baseUrl + '/projects/create', formdata);
    //return super.create(this.baseUrl + '/projects/create', formdata);
  }
  
  /*create(formdata) { 
    return super.createComplex(this.baseUrl + '/projects/create', formdata);
    //return super.create(this.baseUrl + '/projects/create', formdata);
  } */

  getOne(id) {
    //return super.getOne(this.baseUrl + '/projects/getone', id);
    return this.http.get(this.baseUrl + '/projects/getone' + '/' + id, this.getOtherOptions())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  getOneProjectView(id) {
    //return super.getOne(this.baseUrl + '/projects/getOneProjectView', id);
    return this.http.get(this.baseUrl + '/projects/getOneProjectView' + '/' + id)
     .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  getApplicantsList(id) {
    return this.http.get(this.baseUrl + '/projects/getApplicantsList' + '/' + id, this.getOtherOptions())
    .map(response => response.json())
   .catch(error => { return this.handleError(error); });
  }

  getAll() {
    return super.getAll(this.baseUrl + '/projects/getall');
  }

  getallFrontView() {
    return super.getAll(this.baseUrl + '/projects/getallFrontView');
  }

  getAllEmployerProjects() {
    return super.getAll(this.baseUrl + '/projects/getemployerprojects');
  }

  getAdminProjects() {
    return super.getAll(this.baseUrl + '/projects/getadminprojects');
  } 

  getotherprojectsforadmin() {
    return super.getAll(this.baseUrl + '/projects/getotherprojectsforadmin');
  }

  getAllEmployerProjectsById(id) {
    return super.getAll(this.baseUrl + '/projects/getemployerprojectsbyid' + '/' + id);
  }

  getCompletedProjectByMember(id) {
    return super.getAll(this.baseUrl + '/projects/getCompletedProjectByMember' + '/' + id);
  }

  getOngoingProjectByMember(id) {
    return super.getAll(this.baseUrl + '/projects/getOngoingProjectByMember' + '/' + id);
  }

  getAllMemberProjects() {
    return super.getAll(this.baseUrl + '/projects/getmemberprojects');
  }
 
  deleteProject(id: string, username) {
    //return this.http.delete('/projectId, projects/' + _id);
    let url = this.baseUrl + '/projects/deleteproject/' + id + '/' + username;
    //return super.delete(link, id);
    return this.http.delete(url, this.options())
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }
  
  update(projectId, project) {
    //return super.put(this.baseUrl + '/projects/update/' + projectId, project);
    return super.postData(this.baseUrl + '/projects/update/' + projectId, project); 
  }
  //projectTitle
  uploadimage(title, formdata) {
    return this.http.post(this.baseUrl + '/projects/loadimage/' + title, formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }
  //imageName
  updateimage(title, imagename, formdata) {
    return this.http.post(this.baseUrl + '/projects/updateimage/' + title + '/' + imagename, formdata, this.getOtherOptions())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); }) ;
  }

  uploadFiles(title, formdata) {
    //return super.upload(this.baseUrl + 'projects/loadfiles/' + projectId, formdata);
    return this.http.post(this.baseUrl + '/projects/loadfiles/' + title, formdata, this.getOtherOptions())
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

  applyForProject(projectId) {
    return super.getOne(this.baseUrl + '/users/applyforproject', projectId);
  }

  offerMemberProject(projectid, userid, username, email) { 
    //return super.getOne(this.baseUrl + '/projects/offerproject/' + projectid + '/' + userid + '/' + username, email);
    return this.http.get(this.baseUrl + '/projects/offerproject/' + projectid + '/' + userid + '/' + username + '/' + email, this.options())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  memberAcceptProject(projectid, userid, username, email) {
    return this.http.get(this.baseUrl + '/projects/awardproject/' + projectid + '/' + userid + '/' + username + '/' + email, this.options())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  revokeProjectFromMember(projectid, userid, username, email) {
    return this.http.get(this.baseUrl + '/projects/revokeproject/' + projectid + '/' + userid + '/' + username + '/' + email, this.options())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

}
