
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  constructor(private http: HttpClient,private app: AppService) { }

  BLEligibilityLogs(MRNo?:string,VisitAccountNo?:number,EligibilityId?:number,ELStatusId?:number,MessageRequestDate?:string,MessageResponseDate?:string) {
  


    
  return this.app.get(`Coverages/BLEligibilityLogs?${MRNo==undefined?'':(`&MRNo=${MRNo}`)}${VisitAccountNo==undefined?'':(`&VisitAccountNo=${VisitAccountNo}`)}${EligibilityId==undefined?'':(`&EligibilityId=${EligibilityId}`)}${ELStatusId==undefined?'':(`&ELStatusId=${ELStatusId}`)}${MessageRequestDate==undefined?'':(`&MessageRequestDate=${MessageRequestDate}`)}${MessageResponseDate==undefined?'':(`&MessageResponseDate=${MessageResponseDate}`)}`).toPromise();
}




  
}
