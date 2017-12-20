import { Observable } from 'rxjs/Observable';
import { Injectable, } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { DataService } from 'app/services/data.service';

@Injectable()
export class AuthService extends DataService {
  isLoggedin: boolean;
  loginFail: string;
  //private baseUrl: string = 'https://localhost:3000/api';

  constructor(http: Http) {
    super(http);
  }
  
  public getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/X-www-form-urlencoded
    let headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return headers;
  }

  login(usercreds) {
    
    this.isLoggedin = false;
    let loginUrl = this.baseUrl + '/auth/login';

    var creds = 'email=' + usercreds.email + '&password=' + usercreds.password;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.post(loginUrl, creds, options )
      .map(response => {
        let result = response.json();
        //console.log(result);
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          sessionStorage.setItem('currentUser', JSON.stringify(result.user));
          sessionStorage.setItem('userPrefs', JSON.stringify(result.userPrefs));
          this.isLoggedin = true;
          //this.loaduserprefs('yetty'); 
          return true;
        }
        return false;
      }).catch(error => { return this.handleError(error); } )  
  }
  
  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userPrefs');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  loaduserprefs(id) {
    let prefUrl = this.baseUrl + '/users/projectprefs/' + id;
    return this.http.get(prefUrl)
    .map(response => {
      let resu = response.json();
      if(resu) {
        console.log(resu);
      } else {
        console.log('could not load prefs');
      }
      if (resu) {
        sessionStorage.setItem('userPrefs', JSON.stringify(resu));
      }
    }).catch(error => { return this.handleError(error); } )  
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    //let curt = new JwtHelper().decodeToken(token);
    
    //let jwtHelper = new JwtHelper();
    //return jwtHelper.decodeToken(token);
    //return new JwtHelper().decodeToken(token);
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  get userPrefs() {
    let userPref = sessionStorage.getItem('userPrefs');
    if (!userPref) return null;

    return JSON.parse(sessionStorage.getItem('userPrefs'));

  }

  set currentUser(value) {
    if(value & value.user) {
      sessionStorage.setItem('currentUser', JSON.stringify(value.user));
    }
  }

  updateCurrentUser(){

  }

  userRole(role) {
    let token = localStorage.getItem('token');
    if (!token) return null;

    let user = new JwtHelper().decodeToken(token);
    if(user.role === role) return true;
    return false;
  } 

  confirmAccountCreation(category, username) {
    return this.http.get(this.baseUrl + '/auth/confirmaccount/' + category + '/' + username)
      .map(response => response.json())
      .catch(error => { return this.handleError(error); } ) 
  }

  initiatePasswordChange(useremail) {
    let passwordChangeUrl = this.baseUrl + '/auth/verifyemail';
    
    var creds = 'email=' + useremail.email;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.post(passwordChangeUrl, creds, options )
      .map(response => response.json())
      .catch(error => { return this.handleError(error); } ) 
      
  }

  processPasswordChange(usercreds) {
    let passwordChangeUrl = this.baseUrl + '/auth/resetpassword/';

    var creds = 'utoken=' + usercreds.utoken + '&password=' + usercreds.password;
    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.post(passwordChangeUrl, creds, options )
      .map(response => {
        let result = response.json();
        //console.log(result);
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          this.isLoggedin = true;
          return true;
        }
        return false;
      }).catch(error => { return this.handleError(error); } )  
  }
}
 
