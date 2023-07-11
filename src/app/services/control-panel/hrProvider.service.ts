import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class HrProvider {

  constructor(private http: HttpClient,private app: AppService) { }



  InsertProviderSchedule(object: any) {
    return this.app.post('ProviderSchedule/InsertProviderSchedule', object).toPromise();
  }


  UpdateProviderScheduleByPSId(object:any) {
    return this.app.put(`ProviderSchedule/UpdateProviderScheduleByPSId`,object).toPromise();
  }


  
  DeleteProviderSchedule(PSId: number) {
    return this.app.delete(`ProviderSchedule/DeleteProviderSchedule?PSId=${PSId}`).toPromise();
  }




  

GetProviderScheduleList(ProviderId?:number,SiteId?:number,FacilityId?:number,UsageId?:number,StartTime?:string,EndTime?:string) {
  


    
  return this.app.get(`ProviderSchedule/GetProviderScheduleList?${ProviderId==undefined?'':(`&ProviderId=${ProviderId}`)}${SiteId==undefined?'':(`&SiteId=${SiteId}`)}${FacilityId==undefined?'':(`&FacilityId=${FacilityId}`)}${UsageId==undefined?'':(`&UsageId=${UsageId}`)}${StartTime==undefined?'':(`&StartTime=${StartTime}`)}${EndTime==undefined?'':(`&EndTime=${EndTime}`)}`).toPromise();
}



GetProviderScheduleByProviderId( ProviderId:number,  SiteId:number, FacilityId:number,  UsageId:number) {
  


    
  return this.app.get(`ProviderSchedule/GetProviderScheduleByProviderId?ProviderId=${ProviderId}&SiteId=${SiteId}&FacilityId=${FacilityId}&UsageId=${UsageId}`).toPromise();
}



GetProviderFacilityByProviderId( ProviderId:number) {
  


    
  return this.app.get(`ProviderSchedule/GetProviderFacilityByProviderId?ProviderId=${ProviderId}`).toPromise();
}




GetProviderSiteByFacilityId(FacilityId:number) {
  


    
  return this.app.get(`ProviderSchedule/GetProviderSiteByFacilityId?FacilityId=${FacilityId}`).toPromise();
}

GetProviderScheduleByPSId(ProviderId?:number ) {
    //return this.app.get(`ProviderSchedule/GetProviderScheduleByProviderId/${Id}`).toPromise();
    return this.app.get(`ProviderSchedule/GetProviderScheduleByPSId?PSId=${ProviderId}`).toPromise();
    
  }
  
}
