import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import * as moment from 'moment';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { TempdemographicsService } from 'src/app/services/registration/tempdemographics.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TempDemographic } from 'src/app/shared/registration/demographics';
@Component({
  selector: 'app-temporarydemographics',
  templateUrl: './temporarydemographics.component.html',
  styleUrls: ['./temporarydemographics.component.css']
})
export class TemporarydemographicsComponent implements OnInit {

//  constructor() { }

//   ngOnInit(): void {
//   }

// }

bdate: Date;

TemporaryDemographic: TempDemographic;
 
TemporaryPatientId: string;

FirstName: string;
MiddleName: string;
LastName: string;
HomePhone: string;
Zip: string;
Email: string;
Age: string;
WorkPhone: string;
StreetNumber: string;
DwellingNumber: string;
CellPhone: string;

genderOptions:any[];
selectedgenderOptions:any;

country:any[];
selectedCountry:any;

State:any[];
selectedState:any;

city:any[];
selectedCity:any;





selectedCountryNOK:any;

selectedStateNOK:any;

selectedCityNOK:any;



Nationality:any[];
selectedNationality:any;

title:any[];
selectedTitle:any;

cacheItems :string[]= ['RegCities','RegCountries','Nationality','RegStates','RegGender'];

constructor(private fb: FormBuilder,private userService:UsersService,public tempdemographicsservice:TempdemographicsService,private confirmationService: ConfirmationService,private messageService: MessageService) {}

ngOnInit(): void {
  this.TemporaryDemographic = new TempDemographic();
  this.FillCache();

  }

FillCache(){
  this.userService.getCacheItem({entities:this.cacheItems}).then((response: { cache: null; }) => {
    if(response.cache!=null){
      debugger
        this.FillDropDown(response);
    
    }}
    ).catch((error: { message: any; }) =>this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
}


FillDropDown(response:any){
   
  let jParse=  JSON.parse(JSON.stringify(response)).cache;
  let RegCities = JSON.parse(jParse).RegCities;
  let regCountries = JSON.parse(jParse).RegCountries;
  let RegStates = JSON.parse(jParse).RegStates;
  let Nationality = JSON.parse(jParse).Nationality;
  let RegGender = JSON.parse(jParse).RegGender;


  if(RegCities){
   debugger
  
    RegCities = RegCities.map((item: { CityId : any; Name: any; }) => {
        return {
          name: item.Name,
          code: item.CityId
        };
      });
    
      this.city = RegCities.slice(0,100);
    }

    if(regCountries){
 
  
      regCountries = regCountries.map((item: { CountryId : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.CountryId
          };
        });
      
        this.country = regCountries.slice(0,100);;
      }

      if(RegStates){
 
  
        RegStates = RegStates.map((item: { StateId : any; Name: any; }) => {
            return {
              name: item.Name,
              code: item.StateId
            };
          });
        
          this.State = RegStates.slice(0,100);
        }

        this.title = [
          { name: 'Mr', code: 1 },
          { name: 'Mrs', code: 0 },
        ];

        if(Nationality){
 
  
          Nationality = Nationality.map((item: { NationalityId : any; NationalityName: any; }) => {
              return {
                name: item.NationalityName,
                code: item.NationalityId
              };
            });
          
            this.Nationality = Nationality;
          }
          if(RegGender){
 
  
            RegGender = RegGender.map((item: { GenderId : any; Gender: any; }) => {
                return {
                  name: item.Gender,
                  code: item.GenderId
                };
              });
            
              this.genderOptions = RegGender.slice(0,100);
            }

}
submit() {

  if(this.selectedTitle==null||this.TemporaryDemographic.personFirstName == null||
    this.TemporaryDemographic.personMiddleName== null||this.TemporaryDemographic.personLastName==null||this.selectedgenderOptions==null||
    this.TemporaryDemographic.personAge==null||this.TemporaryDemographic.personHomePhone1==null||this.TemporaryDemographic.personZipCode==null||
    this.selectedCountry==null||this.selectedState==null||this.selectedCity==null||this.selectedNationality==null||this.TemporaryDemographic.personCellPhone==null||this.TemporaryDemographic.personEmail==null||
    this.TemporaryDemographic.nokFirstName==null||this.TemporaryDemographic.nokSocialSecurityNo==null||this.TemporaryDemographic.nokZipCode==null||this.TemporaryDemographic.nokHomePhone==null||this.TemporaryDemographic.nokAddress1==null){
  this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the required fileds" });
  return;
}            



  this.TemporaryDemographic.personTitleId = this.selectedTitle.code;
  this.TemporaryDemographic.personNationalityId = this.selectedNationality.code;
 
  this.TemporaryDemographic.personSex = this.selectedgenderOptions.code;

  this.TemporaryDemographic.personCountryId = this.selectedCountry.code;
  this.TemporaryDemographic.personStateId = this.selectedState.code;
  this.TemporaryDemographic.personCityId = this.selectedCity.code;







  
  this.TemporaryDemographic.nokMiddleName = "";
  this.TemporaryDemographic.nokLastName = "";
  this.TemporaryDemographic.nokRelationshipId = 0;
  this.TemporaryDemographic.nokWorkPhone = "";
  this.TemporaryDemographic.nokCellNo = "";
  this.TemporaryDemographic.nokCountryId = this.selectedCountryNOK.code;
  this.TemporaryDemographic.nokStateId = this.selectedStateNOK.code;
  this.TemporaryDemographic.nokCityId = this.selectedCityNOK.code;
  this.TemporaryDemographic.active = true;
  this.TemporaryDemographic.patientBirthDate = this.bdate.toISOString() ;

  this.TemporaryDemographic.createdBy ='';
  this.TemporaryDemographic.updatedBy ='';
  this.TemporaryDemographic.nokAddress2='';

  this.TemporaryDemographic.personAddress1='';
  this.TemporaryDemographic.personAddress2='';


  

debugger;

  this.tempdemographicsservice.submitTempDemographic(this.TemporaryDemographic).then(response => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully saved' });


  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
console.log('Selected Purpose:', this.TemporaryDemographic);
}

}