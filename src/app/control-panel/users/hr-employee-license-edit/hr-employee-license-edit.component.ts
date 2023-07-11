import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';


interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-hr-employee-license-edit',
  templateUrl: './hr-employee-license-edit.component.html',
  styleUrls: ['./hr-employee-license-edit.component.css']
})
export class HrEmployeeLicenseEditComponent implements OnInit {

  HrlicenseId:number;

  
  employeeId:number;
  licenseName:string;
  licenseNo:string;
  licenseStatus:boolean;

  licenseExpiry: Date;


  licenseObj:{};
  loading: boolean = true;



  constructor(private activatedRoute:ActivatedRoute,private userService:UsersService,private confirmationService: ConfirmationService,private messageService: MessageService) {

     // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
 this.activatedRoute.queryParams.subscribe(params => {
  const license = params['id'];
  console.log(license);
  this.HrlicenseId=license;


 

})
   }

  ngOnInit(): void {
    this.LoadLicense();

  }

LoadLicense(){

  
this.userService.getLicenseById(this.HrlicenseId).then(license=>{

  if(license){
    license = license.table1[0];
  
    if(license.expiryDate ){
      this.licenseExpiry = new Date(license.expiryDate.toLocaleString());
  
    }
    this.licenseStatus = license.active;
  
    this.licenseName = license.licenseName;
    this.licenseNo = license.licenseNo;
    this.employeeId = license.employeeId;
  this.licenseObj = license;
  }
  
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));;
  
}
  
SaveLicense()
{

  debugger
  
  

if(!this.licenseObj){


  
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'License not found' });

  return;
}

  var obj: LooseObject = {};

  obj['EmployeeId'] = +this.employeeId;
  obj['Active'] = this.licenseStatus;

  obj['ExpiryDate'] = this.licenseExpiry;

  obj['LicenseNo'] = +this.licenseNo;

  obj['LicenseName'] = this.licenseName;
  obj['HRLicenseId'] = this.HrlicenseId;


  

  
this.loading=true;
  this.userService.saveLicense(obj).then(response => {
    this.loading=false;

    if(response.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Succesfully saved license' });

    }
    else{
      this.loading=false;

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check license' });

    }


  }
    ).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}











}
