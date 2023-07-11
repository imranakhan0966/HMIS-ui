import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { HrEmployee, Role, RelationShip, City, Country, Gender, MaritalStatus, EmployeeType, BloodGroup, Facility, HREmployeeRequestBindingModel, HREmployeeFacilityBindingModel, SecEmployeeRoleBindingModel, HrLicenseBindingModel } from 'src/app/shared/control-panel/users';


interface LooseObject {
  [key: string]: any
}
@Component({
  selector: 'app-hr-employee-create',
  templateUrl: './hr-employee-create.component.html',
  styleUrls: ['./hr-employee-create.component.css']
})
export class HrEmployeeCreateComponent implements OnInit {


  //===================drop downs area===========================//



  licenseName:string;
  licenseNo:string;
  licenseStatus:boolean;
  
licenseExpiry: Date;

  position: string;


  selectedEmployeeTypes: string[] = [];


  selectedVIPAccess: string[] = [];





employeeModel:HrEmployee;

dateofBirth: Date;

dateofJoining: Date;

roles: Role[];

selectedRole: Role;


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

selectedGender: Gender;




maritalstatuses: MaritalStatus[];

selectedMaritalStatus: MaritalStatus;



employeetypes: EmployeeType[];

selectedEmployeeType: EmployeeType;




bloodgroups: BloodGroup[];

selectedBloodGroup: BloodGroup;





password:string;


cacheItems :string[]= ['HREmployeeType','RegBloodGroup','HREmployee','RegMaritalStatus','RegGender','RegCountries','RegStates','RegCities','RegRelationShip','SecRole','RegFacility'];



  //====================end=====================//


  requestObj : HREmployeeRequestBindingModel;
  constructor(private userService:UsersService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
this.requestObj = new HREmployeeRequestBindingModel();
  this.FillCache();


  }


  FillCache(){
    this.userService.getCacheItem({entities:this.cacheItems}).then(response => {
      if(response.cache!=null){

         

          this.FillDropDown(response);
      
      }}
      ).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));;
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
  //this.FillUserInfo(this.employeeId);


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });

}


}).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}


SaveEmployee(){

  let employeeId=33;
  if(this.requestObj){

this.requestObj.EmployeeId = employeeId;

    let licenses:HrLicenseBindingModel[]=[];



    let licensemodel:HrLicenseBindingModel;
    licensemodel = new HrLicenseBindingModel();

licensemodel.Active = this.licenseStatus;
licensemodel.EmployeeId = employeeId;
licensemodel.ExpiryDate = this.licenseExpiry;
licensemodel.LicenseName=this.licenseName;
licensemodel.LicenseNo =+this.licenseNo;

licenses.push(licensemodel);


this.requestObj.LicenseInfo = licenses;


    if(this.requestObj.BloodGroup){
      let bg:any;
      bg = this.requestObj.BloodGroup;
          this.requestObj.BloodGroup = bg.name;
      
    }


    if(this.requestObj.Gender){
      let gdr:any;
      gdr = this.requestObj.Gender;
          this.requestObj.Gender = gdr.name;
      
    }


    if(this.requestObj.MaritalStatus){
      let marital:any;
      marital = this.requestObj.MaritalStatus;
          this.requestObj.MaritalStatus = marital.name;
      
    }


    if(this.requestObj.EmployeeType){
      let emptype:any;
      emptype = this.requestObj.EmployeeType;
          this.requestObj.EmployeeType = emptype.code;
      
    }



    if(this.requestObj.selectedFacility){
      let facilities:HREmployeeFacilityBindingModel[]=[];

      for(let i=0;i<this.requestObj.selectedFacility.length;i++){
        let facility:HREmployeeFacilityBindingModel;
        facility = new HREmployeeFacilityBindingModel();
      
      debugger;

        facility.FacilityID=  isNaN(+this.requestObj.selectedFacility[i].code)  ? 0:+this.requestObj.selectedFacility[i].code;
        facility.EmployeeId=employeeId;

       facilities.push(facility);
      }

    this.requestObj.EmployeeFacility = facilities;

    }
    if(!this.requestObj.selectedFacility){
      let facilities:HREmployeeFacilityBindingModel[]=[];

      this.requestObj.EmployeeFacility =  facilities;
    }



    if(this.requestObj.selectedRole){
      let roles:SecEmployeeRoleBindingModel[]=[];
let role = this.requestObj.selectedRole;


let rolemodel:SecEmployeeRoleBindingModel;
rolemodel = new SecEmployeeRoleBindingModel();

rolemodel.EmployeeId = employeeId;
rolemodel.RoleId = +role.code;

roles.push(rolemodel);

this.requestObj.EmployeeRole =  roles;
    }


    if(!this.requestObj.selectedRole){
      let roles:SecEmployeeRoleBindingModel[]=[];

      this.requestObj.EmployeeRole =  roles;

    }



    if(this.requestObj.CountryID){

      let country:any = this.requestObj.CountryID;
      this.requestObj.CountryID = country.code;
    }

  

    if(this.requestObj.StateID){
      
      let state:any = this.requestObj.StateID;
      this.requestObj.StateID = state.code;
    }

   
    if(this.requestObj.CityID){
      
      let city:any = this.requestObj.CityID;
      this.requestObj.CityID = city.code;
    }



    if(this.requestObj.selectedRelationship){
      let relation:any = this.requestObj.selectedRelationship;
      this.requestObj.EmerRelationship = relation.name;
    }

    
    if(this.requestObj.EmerStateId){
      let state:any = this.requestObj.EmerStateId;
      this.requestObj.EmerStateId = state.code;
    }



    if(this.requestObj.EmerCountryId){
      let country:any = this.requestObj.EmerCountryId;
      this.requestObj.EmerCountryId = country.code;
    }



    if(this.requestObj.EmerCityId){
      let city:any = this.requestObj.EmerCityId;
      this.requestObj.EmerCityId = city.code;
    }



    if(this.requestObj.BusCountryId){
      let country:any = this.requestObj.BusCountryId;
      this.requestObj.BusCountryId = country.code;
    }

    if(this.requestObj.BusStateId){
      let state:any = this.requestObj.BusStateId;
      this.requestObj.BusStateId = state.code;
    }

    if(this.requestObj.BusCityId){
      let city:any = this.requestObj.BusCityId;
      this.requestObj.BusCityId = city.code;
    }



 

    let modifiedObj:any={};

    Object.assign(modifiedObj,this.requestObj);
  
  delete modifiedObj.selectedFacility;
  delete modifiedObj.selectedRole;
  delete modifiedObj.selectedRelationship;
  
  
  console.log(modifiedObj);
  
  
    this.userService.saveEmployee(modifiedObj).then((employees) => {
     
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Saved' });
     
  
     // this.customers.forEach((customer) => (customer.date = new Date(customer.date?.toLocaleString)));
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  

  }
  console.log(this.requestObj);

   

}










}
