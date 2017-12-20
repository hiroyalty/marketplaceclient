import { AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
  
  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  getOrders() { 
    //SINCE WE USE AUTHHTTP IN THE CONSTRUCTOR WE CAN COMMENT OUT 
    //ALL THE BELOW, COS ITS IMPLEMENTED FOR US, AND WE CAN REMOVE THE
    // OPTIONS NEXT TO OUR END POINT TO!!!.

    //let headers = new Headers();
    //let token = localStorage.getItem('token');
    //headers.append('Authorization', 'Bearer '+ token);
    
    //let options = new RequestOptions({ headers: headers });
    //return this.http.get('/api/orders', options)
    
    return this.authHttp.get('https://localhost:3000/api/todos')
    .map(response => response.json()); 
  }

}
