import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class TempdemographicsService {

  constructor(private http: HttpClient,private app: AppService) { }

  submitTempDemographic(object: any) {
    return this.app.post('TempDemographic/InsertTempPatientRecord', object).toPromise();
  }


  getTempDemographics(TempId?:number,  Name?:string,  Address?:string,  PersonEthnicityTypeId?:number,  Mobile?:string,  DOB?:string, Gender?:string,  Country?:number, State?:number,  City?:number,  ZipCode?:string,InsuredId?:number,  CarrierId?:number) {
    return this.app.get(`TempDemographic/GetTempDemographics?${TempId==undefined?'':(`TempId=${TempId}`)}${Name==undefined?'':(`&Name=${Name}`)}${Address==undefined?'':(`&Address=${Address}`)}${PersonEthnicityTypeId==undefined?'':(`&PersonEthnicityTypeId=${PersonEthnicityTypeId}`)}
    
    ${Mobile==undefined?'':(`&Mobile=${Mobile}`)}
    ${DOB==undefined?'':(`&DOB=${DOB}`)}
    ${Gender==undefined?'':(`&Gender=${Gender}`)}
    ${Country==undefined?'':(`&Country=${Country}`)}

    ${State==undefined?'':(`&State=${State}`)}
    ${City==undefined?'':(`&City=${City}`)}
    

    ${ZipCode==undefined?'':(`&ZipCode=${ZipCode}`)}
    ${InsuredId==undefined?'':(`&InsuredId=${InsuredId}`)}

    ${CarrierId==undefined?'':(`&CarrierId=${CarrierId}`)}

    `).toPromise();
  }
}
