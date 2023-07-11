import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private app: AppService) { }

	Login(object: any) {
		return this.app.post('AuthenticateToken/Login', object);
	}
	LogOut() {
		return this.app.post('AuthenticateToken/Logout',null);
	}


	getPatientFamilyByMRNo(MRNo:string) {
		return this.app.get(`Common/GetPatientFamily?MRNo=${MRNo}`).toPromise();
	  }


	  getInsurrancePayerInfo(MRNo:number) {
		return this.app.get(`Common/GetInsurrancePayerInfo?MRNo=${MRNo}`).toPromise();
	  }


	  
getCoverageAndRegPatient(MRNo:string='') {
	return this.app.get(`Common/GetCoverageAndRegPatient?MRNo=${MRNo}`).toPromise();
  }
  

	
}
