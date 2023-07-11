import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/common/api.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { DemographicsService } from 'src/app/services/registration/demographics.service';
import { Gender } from 'src/app/shared/control-panel/users';
import { Patient, RegPatient } from 'src/app/shared/scheduling/viewappointment';

@Component({
  selector: 'app-demographics-list',
  templateUrl: './demographics-list.component.html',
  styleUrls: ['./demographics-list.component.css']
})
export class DemographicsListComponent implements OnInit {


  cacheItems :string[]= ['HREmployeeType','RegBloodGroup','HREmployee','RegMaritalStatus','RegGender','RegCountries','RegStates','RegCities','RegRelationShip','SecRole','RegFacility'];

  constructor(private router:Router,private commonService:ApiService, private userService:UsersService,public demoGrpahicsService:DemographicsService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  mrNo:string;
  filter:boolean;
  Patient:Patient[];
  RegPatient:RegPatient[];

  
genders: Gender[];

selectedGender: Gender | undefined;
  
  ngOnInit(): void {
    this.FillCache();

  //  this.GetCoverageAndRegPatient('-1');
  }


  
  GetCoverageAndRegPatient(MrNo:string = ''){
    debugger
    this.commonService.getCoverageAndRegPatient(MrNo).then((demographics) => {
      console.log("getCoverageAndRegPatient");
  
  
    
  
      console.log(demographics);
  
  
  
  
      if(demographics){
  
  if(demographics.table1){

    this.Patient = demographics.table1;
  }

  debugger
  if(demographics.table2){

    this.RegPatient = demographics.table2;
  }


  
      }
      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
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
    
   //     this.facilities = facility;
    }
  
  
  if(roles){
 
  
      roles = roles.map((item: { RoleId : any; RoleName: any; }) => {
          return {
            name: item.RoleName,
            code: item.RoleId
          };
        });
      
      //    this.roles = roles;
      }
  


  if(relationships){
 
  
      relationships = relationships.map((item: { RelationshipId : any; Relationship: any; }) => {
          return {
            name: item.Relationship,
            code: item.RelationshipId
          };
        });
      
     //     this.relationships = relationships;
      }
  



  

  if(cities){
 
  
      cities = cities.map((item: { CountryId : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.CountryId
          };
        });
      
   //       this.cities = cities;
      }
  

     
  if(countries){
 
  
      countries = countries.map((item: { CountryId : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.CountryId
          };
        });
      
        //  this.countries = countries;
      }
  



             
  if(states){
 
  
      states = states.map((item: { StateID : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.StateID
          };
        });
      
        //  this.states = states;
      }

  
  if(hrEmployee){
 
  
  hrEmployee = hrEmployee.map((item: { TypeID : any; TypeDescription: any; }) => {
      return {
        name: item.TypeDescription,
        code: item.TypeID
      };
    });
  
   //   this.employeetypes = hrEmployee;
  }



  if(maritalStatus){
 
  
      maritalStatus = maritalStatus.map((item: { MaritalStatusId: any; MaritalStatus: any; }) => {
          return {
            name: item.MaritalStatus,
            code: item.MaritalStatusId
          };
        });
      
       //   this.maritalstatuses = maritalStatus;
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
              
                 // this.bloodgroups = bgroup;
              }

  



//               if(this.employeeId)
// {
//  this.FillUserInfo(this.employeeId);
// }

}

  

submitFilter(){

  if(this.mrNo){
    this.filter=false;
    this.GetCoverageAndRegPatient(this.mrNo);

  }

}
  buttonRoute(url:string){
    this.router.navigate([url]);
  }

  ClickFilter(){
    this.filter=true;
  }
  
}
