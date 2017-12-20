import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  //url: string;
  protected baseUrl: string = 'https://localhost:3000/api';

  constructor(public http: Http) { }

  getOne(url, id) {
    return this.http.get(url + '/' + id, this.options())
    .map(response => response.json())
    .catch(error => { return this.handleError(error); });
  }

  getAll(url) {
    return this.http.get(url, this.options())
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }

  create(url, resource) {
    return this.http.post(url, JSON.stringify(resource), this.options())
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }

  postData(url, resource) {
    return this.http.post(url, resource, this.options())
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }

  put(url: string, resource): Observable<Response> {
    return this.http.put(url, JSON.stringify(resource), this.options())
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }

  update(url, resource) {
    //return this.http.patch(url + '/', JSON.stringify({ resource }), this.options())
    return this.http.patch(url, resource, this.options())
      .map(response => response.json())      
      .catch(error => { return this.handleError(error); });
  }

  delete(url, id) {
    return this.http.delete(url + '/' + id, this.options())
      .map(response => response.json())
      //.toPromise()
      .catch(error => { return this.handleError(error); });
  }

  deleteFile(url, filename) {
    return this.http.delete(url + '/' + filename, this.options())
    .map(response => response.json())
    //.toPromise()
    .catch(error => { return this.handleError(error); });
  }
 
  public handleError(error: Response | any) {
    let errMsg: string;
    
    if (error instanceof Response) {
      const body  = error.json() || '';
      const err = body.toString() || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.log(errMsg);
    //console.log(error._body);
    //this.setNotificationMessage(error._body);
    return Observable.throw(errMsg);
  }

  protected getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/X-www-form-urlencoded
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
 
  protected getOtherHeaders() {
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }

  protected getNoContentHeaders() {
    let headers = new Headers();
    headers.delete('Content-Type');
    //headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }

  protected loadToken() {
    let token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return;
  }

  protected options() {
    let options = new RequestOptions({ headers: this.getHeaders() });

    // add authorization header with jwt token
    let token = localStorage.getItem('token');
    if (token) {
      options.headers.append('Authorization', token);
    }
    return options;
  }

  protected getOtherOptions() {
    let options = new RequestOptions({headers: this.getOtherHeaders()});
    
    // add authorization header with jwt token
    let token = localStorage.getItem('token');
    if (token) {
      options.headers.append('Authorization', token);
    }
    return options;
  }

  protected complexFormOptions() {
    let options = new RequestOptions({headers: this.getNoContentHeaders()});
    let token = this.loadToken();
    if (token) {
      options.headers.append('Authorization', token);
    }
    return options;
  }

  protected upload(url, values){
    //let options = this.getOtherOptions();
    let options = this.complexFormOptions();
    //options.params = parameters;
    //return  this.http.post(this._baseURL + 'fileupload', files, options)
    return  this.http.post(url, values, options)
      .map(response => response.json())
      //.catch(error => Observable.throw(error));
      .catch(error => { return this.handleError(error); });
  }

  protected createComplex(url,formdata) {
    let options = this.complexFormOptions();
    //options.params = parameters;
    return this.http.post(url, formdata, options)
      .map(response => response.json())
      .catch(error => { return this.handleError(error); });
  }

  /*protected makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response));
          } else {
              reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }*/

  /*protected setNotificationMessage(msg: string) {
    setTimeout(() => 
    this.notification.error(msg), 1); 
  }*/
}