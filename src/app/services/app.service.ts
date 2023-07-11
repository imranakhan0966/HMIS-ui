import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoaderService } from './common/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: Http,private loaderService:LoaderService) { 

    this.setAuthToken();
  }
 // urlBase = "https://localhost:44342/api/";
  urlBase = "https://localhost:44342/api/";
  auth: any = '';
  setAuthToken() {
   let cookie   = localStorage.getItem('currentUser');
   
   if(cookie!=null){

    
    
    
    this.auth= JSON.parse(cookie).token;
   }
   

    
  }
  post(url: any, data: any) {
  
    this.setAuthToken();

    this.loaderService.toggleLoaderVisibility(true);

    var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${this.auth}`});
  
    var options = new RequestOptions({ headers: headers });
 


    return this.http.post(this.urlBase + url, data,options).pipe(map((res: any) => {
      this.loaderService.toggleLoaderVisibility(false);

      return res.json();
    }));
  }


  put(url: any, data: any) {
  
    this.setAuthToken();

    this.loaderService.toggleLoaderVisibility(true);

 
    var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${this.auth}`});
  
    var options = new RequestOptions({ headers: headers });
 


//    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.urlBase + url, data,options).pipe(map((res: any) => {
      this.loaderService.toggleLoaderVisibility(false);

      return res.json();
    }));
  }
  get(url: any,data=null) {
    this.setAuthToken();
    this.loaderService.toggleLoaderVisibility(true);


    

  
   var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${this.auth}`});
  
   var options = new RequestOptions({ headers: headers });

//    var options = new RequestOptions({ headers: headers });
    return this.http.get(this.urlBase + url,options).pipe(map((res: any) => {
      this.loaderService.toggleLoaderVisibility(false);

      return res.json();
    }));
  }


  delete(url: any) {

    this.setAuthToken();

    this.loaderService.toggleLoaderVisibility(true);

  

    var headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${this.auth}`});
  
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.urlBase + url,options).pipe(map((res: any) => {
      this.loaderService.toggleLoaderVisibility(false);

      return res.json();
    }));
  }

  imagepost(url: any, data: any) {
  
    this.setAuthToken();

    this.loaderService.toggleLoaderVisibility(true);

    var headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${this.auth}`});
  
    var options = new RequestOptions({ headers: headers });
 


    return this.http.post(this.urlBase + url, data,options).pipe(map((res: any) => {
      this.loaderService.toggleLoaderVisibility(false);

      return res.json();
    }));
  }

}
