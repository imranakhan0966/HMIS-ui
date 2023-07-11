import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, ReplaySubject } from 'rxjs';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { DemographicsService } from 'src/app/services/registration/demographics.service';
import { HrEmployee, Role, RelationShip, City, Country, Gender, MaritalStatus, EmployeeType, BloodGroup, Facility, HREmployeeRequestBindingModel, HREmployeeFacilityBindingModel, SecEmployeeRoleBindingModel, HrLicenseBindingModel } from 'src/app/shared/control-panel/users';
import { Family } from 'src/app/shared/scheduling/viewappointment';


interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {
  Demographic: any =  {

  }

  
History:Family[];
Family: History[];
Detail:any;

SubDetail:any;
PreSubDetail:any;


familyFilter:boolean;
historyFilter:boolean;

searchMr:string;


bloodgroup:any[]=[];
selectedBG:any;



gender:any[]=[];
selectedGender:any;



maritalstatus:any[]=[];
selectedmaritalstatus:any;




nationality:any[]=[];
selectednationality:any;






religion:any[]=[];
selectedreligion:any;



ethinic:any[]=[];
selectedethinic:any;


language:any[]=[];
selectedlanguge:any;

title:any[]=[];
selectedTitle:any;
//


referred:any[];
selectedReferredBy:any;

dob: Date;

isVIP:boolean;

image:File;
byteImage:any;
fileName = '';


cacheItems :string[]= ['RegBloodGroup','RegGender','Nationality','Religion','RegEthnicityTypes','Language','RegMaritalStatus','Provider'];

  constructor(private userService:UsersService,public demoGrpahicsService:DemographicsService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
  this.FillCache();

  this.title = [
    { name: 'Mr', code: 1 },
    { name: 'Mrs', code: 0 },
  ];
  }

FillCache(){
  this.userService.getCacheItem({entities:this.cacheItems}).then((response: { cache: null; }) => {
    if(response.cache!=null){
      debugger
        this.FillDropDown(response);
    
    }}
    ).catch((error: { message: any; }) =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
}

FillDropDown(response:any){
   
  let jParse=  JSON.parse(JSON.stringify(response)).cache;
  let RegBloodGroup = JSON.parse(jParse).RegBloodGroup;
  let RegGender = JSON.parse(jParse).RegGender;
  let RegMaritalStatus = JSON.parse(jParse).RegMaritalStatus;
  
  let Nationality = JSON.parse(jParse).Nationality;
  let Religion = JSON.parse(jParse).Religion;
   
  let RegEthnicityTypes = JSON.parse(jParse).RegEthnicityTypes;


  let Language = JSON.parse(jParse).Language;
  let provider  = JSON.parse(jParse).Provider;


  
if(provider){


  provider = provider.map((item: { EmployeeId : any; FullName: any; }) => {
      return {
        name: item.FullName,
        code: item.EmployeeId
      };
    });
  
      this.referred = provider;
  }

  if(Language){
 
  
    Language = Language.map((item: { LanguageId : any; LanguageName: any; }) => {
        return {
          name: item.LanguageName,
          code: item.LanguageId
        };
      });
    
      this.language = Language;
    }
  


   
  

  if(RegEthnicityTypes){
 
  
    RegEthnicityTypes = RegEthnicityTypes.map((item: { TypeId : any; Name: any; }) => {
        return {
          name: item.Name,
          code: item.TypeId
        };
      });
    
      this.ethinic = RegEthnicityTypes;
    }
  




  if(Nationality){
 
  
    Nationality = Nationality.map((item: { NationalityId : any; NationalityName: any; }) => {
        return {
          name: item.NationalityName,
          code: item.NationalityId
        };
      });
    
      this.nationality = Nationality;
    }
  



    if(Religion){
 
  
      Religion = Religion.map((item: { ReligionId : any; ReligionName: any; }) => {
          return {
            name: item.ReligionName,
            code: item.ReligionId
          };
        });
      
        this.religion = Religion;
      }
    
   



 
  if(RegBloodGroup){
 
  
    RegBloodGroup = RegBloodGroup.map((item: { BloodGroupId : any; BloodGroup: any; }) => {
        return {
          name: item.BloodGroup,
          code: item.BloodGroupId
        };
      });
    
      this.bloodgroup = RegBloodGroup;
    }
  
   

    if(RegGender){
 
  
      RegGender = RegGender.map((item: { GenderId : any; Gender: any; }) => {
          return {
            name: item.Gender,
            code: item.GenderId
          };
        });
      
        this.gender = RegGender;
      }
    

      if(RegMaritalStatus){
 
  
        RegMaritalStatus = RegMaritalStatus.map((item: { MaritalStatusId : any; MaritalStatus: any; }) => {
            return {
              name: item.MaritalStatus,
              code: item.MaritalStatusId
            };
          });
        
          this.maritalstatus = RegMaritalStatus;
        }
      
     

      

  




  


}

  
  GetDemographicsByMRNo(MrNo:string = '1001'){
  debugger
  this.demoGrpahicsService.getDemographicsByMRNo(MrNo).then((demographics) => {
    console.log("GetDemographicsByMRNo");


  

    console.log(demographics);




    if(demographics){


if(demographics.table1){

  this.Detail = demographics.table1[0];
}


if(demographics.table2){

  this.PreSubDetail = demographics.table2[0];
}

if(demographics.table6){

  this.SubDetail = demographics.table6[0];
}




if(demographics.table5){
 // this.Family =  demographics.table5;

 


}

    }
    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}




convertFile(file : File) : Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
  return result;
}

onFileSelected(event:any) {

  const file:File = event.target.files[0];

  if (file) {


    const reader = new FileReader();
    let byteArray;


    this.fileName = file.name;



   

      const formData = new FormData();

      formData.append("thumbnail", file);

      this.image=file;
      console.log(this.image);
   


      this.convertFile(event.target.files[0]).subscribe(base64 => {
        debugger
        this.byteImage = base64;
      });

  }
}



 base64ToArrayBuffer(base64:any) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  debugger
  return bytes.buffer;
}



submit() {

  if(this.selectedGender==null||this.selectedmaritalstatus==null||this.selectedBG==null||this.selectedreligion==null||
    this.selectedethinic==null||this.selectednationality==null||this.selectedlanguge==null||this.selectedReferredBy==null||
    this.selectedTitle==null||this.Demographic.parentname==null||this.Demographic.Address==null||this.Demographic.Phone==null||
    this.Demographic.Fax==null||this.Demographic.Email==null||this.Demographic.EmergencyName==null||this.Demographic.EmergencyRelationship==null||
    this.Demographic.EmergencyPhone==null||this.Demographic.EmergencyAddress==null||this.Demographic.RelativeName==null||this.Demographic.RelativesRelationship==null||
    this.Demographic.RelativesPhone==null||this.Demographic.RelativesAddress==null||this.Demographic.FamilyPhone==null||this.Demographic.FamilyEmail==null){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please fill all the required fileds" });
    return;
  }     

  this.Demographic.mRno =  "";//1547;
  this.Demographic.personFirstName = this.Demographic.FirstName;
  this.Demographic.personMiddleName = this.Demographic.MiddleName;
  this.Demographic.personLastName = this.Demographic.LastName;
  this.Demographic.personTitleId = this.selectedTitle.code;
  this.Demographic.personSocialSecurityNo = "123";
  this.Demographic.vipPatient = true;
  this.Demographic.personSex = this.selectedGender.name;
  this.Demographic.personMaritalStatus = this.selectedmaritalstatus.code;
  this.Demographic.personEthnicityTypeId = this.selectedethinic.code;
  this.Demographic.patientBirthDate = this.dob.toISOString(); // "1995-06-06T11:52:19.008Z";//this.dob;
  this.Demographic.personDriversLicenseNo = this.Demographic.DrivingLicenseNo;
  this.Demographic.personAddress1 = this.Demographic.Address;
  this.Demographic.personCityId = 10;
  this.Demographic.personStateId = 22;
  this.Demographic.personCountryId = 254;
  this.Demographic.personHomePhone1 = this.Demographic.Phone;
  this.Demographic.personFax = this.Demographic.Fax;
  this.Demographic.personEmail = this.Demographic.Email;
  this.Demographic.patientBloodGroupId = this.selectedBG.code;
  this.Demographic.patientPictureBase64 = this.byteImage;//this.image;
  this.Demographic.parentType = true;
  this.Demographic.laborCardNo = this.Demographic.LaborCardNo;

  this.Demographic.parentFirstName = "";
  this.Demographic.fatherHomePhone = this.Demographic.FamilyPhone;
  this.Demographic.fatherEmailAddress = this.Demographic.FamilyEmail;
  this.Demographic.motherFirstName = this.Demographic.FamilyMotherName;
  this.Demographic.motherHomePhone  = this.Demographic.FamilyMotherPhone;
  this.Demographic.motherEmailAddress = this.Demographic.FamilyMotherEmail;
  this.Demographic.religion = this.selectedreligion.code;
  this.Demographic.nokFirstName = this.Demographic.RelativeName;
  this.Demographic.nokRelationshipId = 0;
  this.Demographic.nokHomePhone = this.Demographic.RelativesPhone;
  this.Demographic.nokAddress1 = this.Demographic.RelativesAddress;
  this.Demographic.nokCityId = 10;
  this.Demographic.nokStateId = 22;
  this.Demographic.nokCountryId = 254;
  this.Demographic.spouseFirstName = "";
  this.Demographic.primaryLanguage = this.selectedlanguge.code;
  this.Demographic.eContactFirstName = this.Demographic.EmergencyName;
  this.Demographic.eContactRelationship  =this.Demographic.EmergencyRelationship;
  this.Demographic.eContactHomePhone = this.Demographic.EmergencyPhone;;
  this.Demographic.eContactAddress1 = this.Demographic.EmergencyAddress;;
  this.Demographic.eContactCityId = 10;
  this.Demographic.eContactStateId = 22;
  this.Demographic.eContactCountryId = 254;
  this.Demographic.passportNo = this.Demographic.passportNo;
  this.Demographic.ParentFirstName = this.Demographic.parentname;
  this.Demographic.signedDate = "2023-04-03T08:11:31.207Z";
  this.Demographic.expiryDate = "2023-06-06T08:11:31.207Z";
  this.Demographic.isNewPatient = true;
  this.Demographic.personTempCountryId = 254;
  this.Demographic.personOtherCityId = 10;
  this.Demographic.personOtherStateId = 22;
  this.Demographic.personOtherCountryId = 254;

  this.Demographic.nationality = this.selectednationality.code;
  this.Demographic.isReport = true;
  this.Demographic.mediaChannelId = 11;
  this.Demographic.mediaItemId = 23;
  this.Demographic.tempId  = 1;
  this.Demographic.emiratesIDN = this.Demographic.EmiratesId;
  this.Demographic.regPatientEmployer = [
    {
      mRno: "",
      employmentOccupation: 1,
      employmentTypeId: 1,
      employmentStatusId: 1,
      employmentCompanyName: "mhg"
    }
  ];
  
  this.Demographic.regAccount = [
    {
      mRno: "",
      typeId: true,
      masterAccountNo: "",
      relationship: "friend"
    }
  ];
  
  this.Demographic.regAssignments = [
    {
      mRno: "",
      providerId: 1,
      departmentId: 1,
      feeScheduleId: 1,
      financialClassId: 2,
      locationId: 1,
      referringProviderId: 1,
      referralTypeId: 1,
      active: true,
      proofOfIncome: "",
      referringProviderName: ""
    }
  ];
 
  this.demoGrpahicsService.submitDemographic(this.Demographic).then(response => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully saved' });
    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

      console.log('Selected Purpose:', this.Demographic);
}




openFamily(){
  this.familyFilter=true;
}

openHistory(){
  this.historyFilter=true;
}

search(){


  if(this.searchMr){
    this.Detail = {};
    this.Family=[];
    this.History=[];
  
  this.GetDemographicsByMRNo(this.searchMr);
//  this.GetPatientHistoryByMRNo(this.searchMr);
  }


}
}
