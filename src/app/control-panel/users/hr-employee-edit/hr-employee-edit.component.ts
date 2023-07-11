import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { HrEmployee, Role, Facility, RelationShip, City, Country, Gender, MaritalStatus, EmployeeType, BloodGroup, HrLicense } from 'src/app/shared/control-panel/users';



interface LooseObject {
  [key: string]: any
}


@Component({
  selector: 'app-hr-employee-edit',
  templateUrl: './hr-employee-edit.component.html',
  styleUrls: ['./hr-employee-edit.component.css']
})



export class HrEmployeeEditComponent implements OnInit {


   employeeInfo :any;
   secemployeerole :any;
   hrlicenseinfo :HrLicense[];
   hremployeefacility:any;

  
  //===================drop downs area===========================//

  isEmployee: boolean=false;
  isReferring: boolean=false;
  isIndividual: boolean=false;
  isActive: boolean=false;


  selectedVIPAccess: string[] = [];




  licenseName:string;
  licenseNo:string;
  licenseStatus:boolean;
  
licenseExpiry: Date;


employeeModel:HrEmployee;

dateofBirth: Date;

dateofJoining: Date;

roles: Role[];

selectedRole: Role | undefined;


facilities : Facility[];
selectedFacility:Facility;



relationships: RelationShip[];

selectedRelationship: RelationShip;


cities: City[];

selectedCity: City;



countries: Country[];

selectedCountry: Country;




states: Country[];

selectedState: Country;




genders: Gender[];

selectedGender: Gender | undefined;




maritalstatuses: MaritalStatus[];

selectedMaritalStatus: MaritalStatus | undefined;



employeetypes: EmployeeType[];

selectedEmployeeType: EmployeeType | undefined;




bloodgroups: BloodGroup[];

selectedBloodGroup: BloodGroup | undefined;




  //====================end=====================//


  

loading: boolean = true;





password:string;


cacheItems :string[]= ['HREmployeeType','RegBloodGroup','HREmployee','RegMaritalStatus','RegGender','RegCountries','RegStates','RegCities','RegRelationShip','SecRole','RegFacility'];



position: string;



@ViewChild('dt1', {  
    static: true  
}) dt1: any  ;



@ViewChild('searchTxt', {  
    static: true  
}) searchTxt: any  ;


employeeId:number;
  constructor(private activatedRoute:ActivatedRoute,private userService:UsersService,private confirmationService: ConfirmationService,private messageService: MessageService) {


 // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
 this.activatedRoute.queryParams.subscribe(params => {
  const userId = params['id'];
  console.log(userId);
  this.employeeId=userId;


 

})

   }

  ngOnInit(): void {

    this.FillCache();
  }



  
  FillCache(){
    this.userService.getCacheItem({entities:this.cacheItems}).then(response => {
      if(response.cache!=null){

         

          this.FillDropDown(response);
      
      }}
      ).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));;
  }

  FillUserInfo(userId:number){
    this.userService.getHrEmployeesByEmpId(userId).then((employee) => {
      this.loading = false;

    console.log(employee);
  this.employeeInfo = employee.table1[0];
  this.secemployeerole = employee.table2[0];
  this.hrlicenseinfo = employee.table3;
  this.hremployeefacility = employee.table4[0];

  console.log(this.employeeInfo);
  console.log(this.secemployeerole);

  console.log(this.hrlicenseinfo);

  console.log(this.hremployeefacility);


debugger
if( this.secemployeerole){

this.selectedRole = this.roles.find(a=>a.code==this.secemployeerole?.roleId);
  

}

  
  if(this.employeeInfo){
  this.dateofBirth = new Date(this.employeeInfo.dob?.toLocaleString());
  this.dateofJoining = new Date(this.employeeInfo.joiningDate?.toLocaleString());

  this.selectedVIPAccess = this.employeeInfo?.vipPatientAccess;


  
  this.isEmployee =   this.employeeInfo.isEmployee==null?false:(this.employeeInfo?.isEmployee=="1"?true:false);
  this.isReferring = this.employeeInfo.isRefProvider==null?false: (this.employeeInfo?.isRefProvider=="1"?true:false);
  this.isIndividual = this.employeeInfo?.isPerson==null?false: (this.employeeInfo?.isPerson=="1"?true:false);
  this.isActive = this.employeeInfo?.active;


  if(this.employeeInfo?.employeeType){
    this.selectedEmployeeType =  this.employeetypes.find(a=>a.code == this.employeeInfo?.employeeType);

  }

  if(this.employeeInfo?.bloodGroup){
    this.selectedBloodGroup = this.bloodgroups.find(a=>a.name==this.employeeInfo?.bloodGroup);

  }

  if(this.employeeInfo?.gender){
    this.selectedGender = this.genders.find(a=>a.name==this.employeeInfo?.gender.trim());

  }


  if(this.employeeInfo?.maritalStatus){
    this.selectedMaritalStatus = this.maritalstatuses.find(a=>a.name==this.employeeInfo?.maritalStatus);

  }







  }

  if(this.hrlicenseinfo){
if(this.hrlicenseinfo.length>0)
{
  this.hrlicenseinfo.forEach((license:any) => (license.expiryDate =  license.expiryDate==null ? '' :  new Date(license.expiryDate?.toLocaleString())));


}

  }
  
     // 
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));;
  }


  

FillDropDown(response:any){
   
  let jParse=  JSON.parse(JSON.stringify(response)).cache;
  let hrEmployee = JSON.parse(jParse).HREmployeeType;
  let maritalStatus = JSON.parse(jParse).RegMaritalStatus;
  let gender = JSON.parse(jParse).RegGender;
  let bgroup = JSON.parse(jParse).RegBloodGroup;
  let countries = JSON.parse(jParse).RegCountries;
  let states = JSON.parse(jParse).RegStates;
  let cities = JSON.parse(jParse).RegCities;
  let relationships = JSON.parse(jParse).RegRelationShip;
  let roles = JSON.parse(jParse).SecRole;
  let facility  = JSON.parse(jParse).RegFacility;




  if(facility){
 
  
    facility = facility.map((item: { ID : any; Name: any; }) => {
        return {
          name: item.Name,
          code: item.ID
        };
      });
    
        this.facilities = facility;
    }
  
  
  if(roles){
 
  
      roles = roles.map((item: { RoleId : any; RoleName: any; }) => {
          return {
            name: item.RoleName,
            code: item.RoleId
          };
        });
      
          this.roles = roles;
      }
  


  if(relationships){
 
  
      relationships = relationships.map((item: { RelationshipId : any; Relationship: any; }) => {
          return {
            name: item.Relationship,
            code: item.RelationshipId
          };
        });
      
          this.relationships = relationships;
      }
  



  

  if(cities){
 
  
      cities = cities.map((item: { CountryId : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.CountryId
          };
        });
      
          this.cities = cities;
      }
  

     
  if(countries){
 
  
      countries = countries.map((item: { CountryId : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.CountryId
          };
        });
      
          this.countries = countries;
      }
  



             
  if(states){
 
  
      states = states.map((item: { StateID : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.StateID
          };
        });
      
          this.states = states;
      }

  
  if(hrEmployee){
 
  
  hrEmployee = hrEmployee.map((item: { TypeID : any; TypeDescription: any; }) => {
      return {
        name: item.TypeDescription,
        code: item.TypeID
      };
    });
  
      this.employeetypes = hrEmployee;
  }



  if(maritalStatus){
 
  
      maritalStatus = maritalStatus.map((item: { MaritalStatusId: any; MaritalStatus: any; }) => {
          return {
            name: item.MaritalStatus,
            code: item.MaritalStatusId
          };
        });
      
          this.maritalstatuses = maritalStatus;
      }
  




      if(gender){
 
  
          gender = gender.map((item: { GenderId: any; Gender: any; }) => {
              return {
                name: item.Gender,
                code: item.GenderId
              };
            });
          
              this.genders = gender;
          }




          if(bgroup){
 
  
              bgroup = bgroup.map((item: { BloodGroupId: any; BloodGroup: any; }) => {
                  return {
                    name: item.BloodGroup,
                    code: item.BloodGroupId
                  };
                });
              
                  this.bloodgroups = bgroup;
              }

  



              if(this.employeeId)
{
 this.FillUserInfo(this.employeeId);
}

}




confirm(event: Event,Id:number,position: string) {

  this.position=position;
  this.confirmationService.confirm({

      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

     this.RemoveLicense(Id);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
      key: 'positionDialog'
  });
}


RemoveLicense(Id:number){
  this.userService.removeLicense(Id).then((response)=>{
    debugger;
if(response.success){
  this.FillUserInfo(this.employeeId);


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });

}


}).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}

handleSearchEvent(event:Event) {

  debugger;
let query = (event.target as HTMLTextAreaElement).value;
  this.dt1.filterGlobal(query, 'contains');



  console.log(query);
}

clear(table: Table) {
  table.clear();
}


SaveLicense()
{

  debugger
  
  



  var obj: LooseObject = {};

  obj['EmployeeId'] = +this.employeeId;
  obj['Active'] = this.licenseStatus;

  obj['ExpiryDate'] = this.licenseExpiry;

  obj['LicenseNo'] = +this.licenseNo;

  obj['LicenseName'] = this.licenseName;

this.loading=true;
  this.userService.saveLicense(obj).then(response => {
    
    if(response.success){
      this.loading=false;
    this.FillUserInfo(this.employeeId);
    }
    else{
      this.loading=false;

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check license' });

    }


  }
    ).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));;

}
}
