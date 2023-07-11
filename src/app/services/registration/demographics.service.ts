import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class DemographicsService {

  constructor(private http: HttpClient,private app: AppService) { }

  getDemographicsByMRNo(MRNo:string) {
    return this.app.get(`Demographic/GetDemographics?MRNo=${MRNo}`).toPromise();
}


getPatientHistoryByMRNo(MRNo:string) {
  return this.app.get(`Demographic/GetPatientHistory?MRNo=${MRNo}`).toPromise();
}






submitDemographic(object: any) {
  return this.app.post('Demographic/InsertPatientRecord', object).toPromise();
}


UpdatePatientRecordByMRNo(object: any) {
  return this.app.put('Demographic/UpdatePatientRecordByMRNo', object).toPromise();
}


}
