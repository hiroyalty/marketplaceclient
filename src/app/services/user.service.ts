import { Http } from '@angular/http';
import { DataService } from 'app/services/data.service';
import { Injectable } from '@angular/core';
import { AppUser } from 'app/models/app-user';

@Injectable()
export class UserService extends DataService {

  constructor(http: Http) {
    super(http);
  }

  getAllUsers() {
    return super.getAll(this.baseUrl + '/users/getallusers');
  }

  getUser(id) {
    return super.getOne(this.baseUrl + '/users/getuser', id);
  }

  create(user: AppUser) { 
    return super.create(this.baseUrl + '/auth/register', user);
  }

  userUpdate(user) {
    return super.put(this.baseUrl + '/users/update', user);
    //return this.http.post(this.baseUrl + '/users/update', user); 
  }

  userUpdatePrefs(id, resource) {
    return super.put(this.baseUrl + '/users/updateprefs/' + id, resource);
  }

  getProjectPref(id) {
    return super.getOne(this.baseUrl + '/users/projectprefs', id);
  }

  adminUpdateUser(userId, user) {
    //return this.http.put('/users/' + user._id, user);
    return super.update(this.baseUrl + '/users/update' + userId, user);
  }
 
  delete(id: string) {
    //return this.http.delete('/users/' + _id);
    let link = this.baseUrl + '/users/remove';
    return super.delete(link, id);
  }

  deleteFile(filename: string) {
    let link = this.baseUrl + '/users/deletefile';
    return super.deleteFile(link, filename);
  }
  
  updatePassword(user) {
    return this.http.post(this.baseUrl + '/users/updatepassword', user, this.options())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); } ) 
  }

  uploadCV(formdata: any ) {
    return this.http.post(this.baseUrl + '/users/uploadcv', formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }

  uploadCoverletter(formdata: any ) {
    return this.http.post(this.baseUrl + '/users/uploadcoverletter', formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }

  uploadPicture(formdata: any ) {
    return this.http.post(this.baseUrl + '/users/uploadpicture', formdata, this.getOtherOptions())
    .catch(error => { return this.handleError(error); }) ;
  }
}
