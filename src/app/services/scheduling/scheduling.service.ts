import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private http: HttpClient,private app: AppService) { }



  submitappointmentbooking(object: any) {
    return this.app.post('Appointment/InsertAppointment', object).toPromise();
  }


  UpdateByAppId(object: any) {
    return this.app.put('Appointment/UpdateByAppId', object).toPromise();
  }
  

  cancelBooking(AppId:number,AppStatusId:number ,ByProvider:boolean,RescheduledId:number) {
    return this.app.get(`Appointment/CancelOrRescheduleAppointment?AppId=${AppId}&AppStatusId=${AppStatusId}&ByProvider=${ByProvider}&RescheduledId=${RescheduledId}`).toPromise();
  }
  



  searchAppointment(FromDate:string,ToDate:string,ProviderID?:number,LocationID?:number,SpecialityID?:number,SiteID?:number,FacilityID?:number,Page?:number,Size?:number) {
  

debugger
    
    return this.app.get(`Appointment/SearchAppointment?FromDate=${FromDate}&ToDate=${ToDate}${ProviderID==undefined?'':(`&ProviderID=${ProviderID}`)}${LocationID==undefined?'':(`&LocationID=${LocationID}`)}${SpecialityID==undefined?'':(`&SpecialityID=${SpecialityID}`)}${SiteID==undefined?'':(`&SiteID=${SiteID}`)}${FacilityID==undefined?'':(`&FacilityID=${FacilityID}`)}${Page==undefined?'':(`&Page=${Page}`)}${Size==undefined?'':(`&Size=${Size}`)}`).toPromise();
}




searchAppointmentHistory(MRNo:string,ProviderId?:number,PatientStatusId?:number,AppStatusId?:number,Page?:number,Size?:number,SortColumn?:string,SortOrder?:string) {
  


    
  return this.app.get(`Appointment/SearchAppointmentHistory?MRNo=${MRNo}${ProviderId==undefined?'':(`&ProviderId=${ProviderId}`)}${PatientStatusId==undefined?'':(`&PatientStatusId=${PatientStatusId}`)}${AppStatusId==undefined?'':(`&AppStatusId=${AppStatusId}`)}${Page==undefined?'':(`&Page=${Page}`)}${Size==undefined?'':(`&Size=${Size}`)}${SortColumn==undefined?'':(`&SortColumn=${SortColumn}`)}${SortOrder==undefined?'':(`&SortOrder=${SortOrder}`)}`).toPromise();
}





}
