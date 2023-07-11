import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {

  constructor(private http: HttpClient,private app: AppService) { }


  // GetSearch( CompanyOrIndividual?:any,  LastName?:string, InsuredIDNo? : string,  PageNumber?:number, PageSize?:number) {

  //   debugger
 
  //   return this.app.get(`Coverages/GetSearch?CompanyOrIndividual=${CompanyOrIndividual}&LastName=${LastName}&InsuredIDNo=${InsuredIDNo}&PageNumber=${PageNumber}&PageSize=${PageSize}`).toPromise();

 
  // }
  GetSearch( CompanyOrIndividual?:any,  LastName?:string, SSN?: string, InsuredIDNo? : string, MRNo?:any,   PageNumber?:number, PageSize?:number) {

    debugger
 
    return this.app.get(`Coverages/GetSearch?CompanyOrIndividual=${CompanyOrIndividual}&LastName=${LastName}&SSN=${SSN}&InsuredIDNo=${InsuredIDNo}&MRNo=${MRNo}&PageNumber=${PageNumber}&PageSize=${PageSize}`).toPromise();

 
  }

  GetSubscriberDatails(InsuredIDNo:string='') {
    return this.app.get(`Coverages/GetSubscriberDatails?InsuredIDNo=${InsuredIDNo}`).toPromise();
  }
  

  GetCoverage(MRNo:string) {
    debugger
    return this.app.get(`Coverages/GetCoverage?MRNo=${MRNo}`).toPromise();
  }




  InsertSubscriber(object: any) {
    debugger
    return this.app.post('Coverages/InsertSubscriber', object).toPromise();
  }


  InsertCoverage(object: any) {
    return this.app.post('Coverages/InsertCoverage', object).toPromise();
  }
  FetchImageData(obj:FormData) {
    debugger
  return this.app.imagepost(`Coverages/GetImageData`,obj).toPromise();
  }
  
}
