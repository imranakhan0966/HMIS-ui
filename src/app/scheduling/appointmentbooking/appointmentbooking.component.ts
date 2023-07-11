import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {SchedulingService }from '../../services/scheduling/scheduling.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/common/api.service';

@Component({
  selector: 'app-appointmentbooking',
  templateUrl: './appointmentbooking.component.html',
  styleUrls: ['./appointmentbooking.component.css']
})
export class AppointmentbookingComponent implements OnInit {
mrNo:string;

  date: Date;

AppoinmentBooking: any =  {

  
 }
  



duration:any[];
selectedDuration:any;



purpose:any[];
selectedPurpose:any;

// submit() {
//   console.log('Selected Purpose:', this.AppoinmentBooking);
// }


visittype:any[];
selectedVisitType:any;



case:any[];
selectedCase:any;
// selectedCase = [
//   { label: 'Select gender', value: '' },
//   { label: 'Male', value: 'male' },
//   { label: 'Female', value: 'female' },
//   { label: 'Other', value: 'other' }
// ];



referred:any[];
selectedReferredBy:any;

schType:any[]=[];
selectedSchType:any;



type:any[];
selectedType:any;


location:any[];
selectedLocation:any;

criteria:any[];
selectedCriteria:any;

notified:any[];
selectedNotified:any;

status:any[];
selectedStatus:any;


payer:any[];
selectedPayer:any;

insurranceNo:string;

cacheItems :string[]= ['SchAppointmentType','VisitType','RegLocations','SchAppointmentCriteria','PatientNotifiedOptions','SchAppointmentStatus','ProblemList','BLPayer','Provider','RegFacility','RegLocationTypes','providerspecialty'];


speciality: any[];
selectedSpeciality: any;

provider: any[];
selectedProviders: any;

sites: any[];
selectedSites: any;

facilities : any[];
selectedFacility:any;
//requestObj : VisitType;

  constructor(private commonService:ApiService, private route: ActivatedRoute,private userService:UsersService,private messageService: MessageService,private confirmationService: ConfirmationService,private schservice: SchedulingService) { }
  
  ngOnInit(): void {
    //this.requestObj = new VisitType();

    this.route.queryParams
 
    .subscribe(params => {
      console.log(params); // { order: "popular" }
      let dt:any = params;

      if(dt.date){
        
        this.date =  new Date(dt.date);
      }

    
    }
  );


  this.FillCache();
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
   

  console.log(response);
  let jParse=  JSON.parse(JSON.stringify(response)).cache;
  let visitType = JSON.parse(jParse).VisitType;
  let regLocations = JSON.parse(jParse).RegLocations;
  let schAppointmentCriteria = JSON.parse(jParse).SchAppointmentCriteria;
  let patientNotifiedOptions = JSON.parse(jParse).PatientNotifiedOptions;
  let schAppointmentStatus = JSON.parse(jParse).SchAppointmentStatus;
  let blPayer = JSON.parse(jParse).BLPayer;
  let problemList = JSON.parse(jParse).ProblemList;
  let provider  = JSON.parse(jParse).Provider;
  let SchAppointmentType  = JSON.parse(jParse).SchAppointmentType;
  let speciality  = JSON.parse(jParse).providerspecialty;
  let sites  = JSON.parse(jParse).RegLocationTypes;
  let regFacility  = JSON.parse(jParse).RegFacility;

  debugger


  if(blPayer){
debugger

    blPayer = blPayer.map((item: { PayerId : any; PayerName: any; }) => {
        return {
          name: item.PayerName,
          code: item.PayerId
        };
      });
    
        this.payer = blPayer;
    }
     


  if(sites){


    sites = sites.map((item: { TypeId : any; Name: any; }) => {
        return {
          name: item.Name,
          code: item.TypeId
        };
      });
    
        this.sites = sites;
    }
  if(provider){
debugger
 
    provider = provider.map((item: { EmployeeId : any; FullName: any; }) => {
        return {
          name: item.FullName,
          code: item.EmployeeId
        };
      });
    
        this.provider = provider;
    }
  
  if(speciality){

debugger
    speciality = speciality.map((item: { SpecialtyID : any; SpecialtyName: any; }) => {
        return {
          name: item.SpecialtyName,
          code: item.SpecialtyID
        };
      });
    
debugger
        this.speciality = speciality;
    }
  
if(SchAppointmentType){

  
 
  SchAppointmentType = SchAppointmentType.map((item: { AppTypeId : any; AppType: any; }) => {
      return {
        name: item.AppType,
        code: item.AppTypeId
      };
    });
  
      this.type = SchAppointmentType;
  }



  
if(provider){

  debugger

// console.log(provider);
//   provider = provider.map((item: { EmployeeId : any; FullName: any; }) => {
//       return {
//         name: item.FullName,
//         code: item.EmployeeId
//       };
//     });
  

    debugger
      this.referred = provider;
  }



  if(visitType){
 
  
    visitType = visitType.map((item: { VisitTypeId : any; VisitTypeName: any; }) => {
        return {
          name: item.VisitTypeName,
          visittypeid: item.VisitTypeId
        };
      });
    
        this.visittype = visitType;
    }
  
    this.case = [
      { name: 'Case 1', criteriaid: 1 },
      { name: 'Case 2', criteriaid: 2 },
      { name: 'Case 3', criteriaid: 3 },
    ];
  
    // this.referred = [
    //   { name: 'Referred 1', criteriaid: 1 },
    //   { name: 'Referred 2', criteriaid: 2 },
    //   { name: 'Referred 3', criteriaid: 3 },
    // ];

    // this.type = [
    //   { name: 'Type 1', criteriaid: 1 },
    //   { name: 'Type 2', criteriaid: 2 },
    //   { name: 'Type 3', criteriaid: 3 },
    // ];

    this.duration = [
      { name: '1 month', criteriaid: 1 },
      { name: '2 months', criteriaid: 2 },
      { name: '3 months', criteriaid: 3 },
    ];

    // this.payer = [
    //   { name: 'Life Line Hospital', criteriaid: 1 },
    //   { name: 'Al Noor Hospital', criteriaid: 2 },
    //   { name: 'Tabbba', criteriaid: 3 },
    // ];




  if(regLocations){
 
  
    regLocations = regLocations.map((item: { LocationId : any; Name: any; }) => {
          return {
            name: item.Name,
            locationid: item.LocationId
          };
        });
      
          this.location = regLocations;
      }
  


  if(schAppointmentCriteria){
 
  
    schAppointmentCriteria = schAppointmentCriteria.map((item: { CriteriaId : any; CriteriaName: any; }) => {
          return {
            name: item.CriteriaName,
            criteriaid: item.CriteriaId
          };
        });
      
          this.criteria = schAppointmentCriteria;
      }
  


  if(patientNotifiedOptions){
    
    patientNotifiedOptions = patientNotifiedOptions.map((item: { NotifiedId : any; NotifiedOptions: any; }) => {
      return {
        name: item.NotifiedOptions,
        notifiedid: item.NotifiedId
      };
    });
  
      this.notified = patientNotifiedOptions;
  }


 
if(schAppointmentStatus){


  schAppointmentStatus = schAppointmentStatus.map((item: { AppStatusId : any; AppStatus: any; }) => {
      return {
        name: item.AppStatus,
        appstatusid: item.AppStatusId
      };
    });
  
      this.status = schAppointmentStatus;
  }



// if(blPayer){


//   blPayer = blPayer.map((item: { PayerId : any; PayerName: any; }) => {
//       return {
//         name: item.PayerName,
//         payerid: item.PayerId
//       };
//     });
  
//       this.payer = blPayer;
//   }


  if(problemList){


    problemList = problemList.map((item: { ProblemId : any; ProblemName: any; }) => {
        return {
          name: item.ProblemName,
          problemid: item.ProblemId
        };
      });
    
        this.purpose = problemList;
    }
  
    this.userService.getEmployeeFacilityFromCache().then(response => {
      if(response.cache!=null){
        let jParse=  JSON.parse(JSON.stringify(response)).cache;
    
        let  hremployeefacility =JSON.parse(jParse); 
    
    
    
     if(hremployeefacility){
    
     
      let facilityIds = hremployeefacility.map((item: { FacilityID : any}) => {
        return item.FacilityID;
          
        
        
      });
    
      //in RegFacility where facilityid match in RegFacility
    
    
    if(facilityIds){
    
    
    if(regFacility){
    
    
      regFacility = regFacility.map((item: { Id : any; Name: any; }) => {
          return {
            name: item.Name,
            code: item.Id
          };
        });
    
    
    if(regFacility){
    
    let facilityonemployee = regFacility.filter((obj:any) => {
      
      return facilityIds.includes(obj.code);
    });
    
    
    this.facilities = facilityonemployee;
    
    }
    
      
      }
    
    
    }
    
    
    
    
    
    
    
     }
    
      
      }}
      ).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}
  
appointment: string;



searchMrEvent(event:any){

  debugger;
  this.mrNo = event;

  if(this.mrNo){
    this.getInsurrancePayerInfo(+this.mrNo);
  }

}


getInsurrancePayerInfo(mrNo:number){
  this.commonService.getInsurrancePayerInfo(mrNo).then(response => {

    if(response){

      if(response.table1){


        if(response.table1.length>0){
this.insurranceNo =         response.table1[0].insuredIDNo;

        }



     let    payerlist = response.table1.map((item: { payerId : any; payerName: any; }) => {
      
      debugger
          return {
            
            name: item.payerName,
            problemid: item.payerId
          };
        });
      
          this.payer = payerlist;

       
    
      }
    }
  console.log(mrNo);

  })
}

  submit() {
    debugger
    var providerId=this.selectedProviders.code;
    var facilityId=this.selectedFacility.code;
    var siteId=this.selectedSites.code;
    var specialityId=this.selectedSpeciality.code;
    var payer=this.selectedPayer;

    if(this.mrNo=='' || this.mrNo==undefined){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please search MrNo' });
      return;
    }
    if(this.selectedProviders =='' || this.selectedProviders ==undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Provider' });
      return;

    }

    if(this.selectedSpeciality =='' || this.selectedSpeciality ==undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Speciality' });
      return;

    }

    if(this.selectedFacility =='' || this.selectedFacility ==undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Facility' });
      return;

    }
    if(this.selectedSites =='' || this.selectedSites ==undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Site' });
      return;

    }
              
    this.AppoinmentBooking.PurposeOfVisit=this.selectedPurpose.name;
    this.AppoinmentBooking.VisitTypeId=this.selectedVisitType.visittypeid;

    this.AppoinmentBooking.AppointmentClassification=1;

    this.AppoinmentBooking.AppId = 0;
    this.AppoinmentBooking.ProviderId = providerId;

this.AppoinmentBooking.MRNo =this.mrNo;
this.AppoinmentBooking.AppDateTime =  this.date.toISOString(); //"2023-05-25T10:00:00.000Z";
this.AppoinmentBooking.Duration = 30;
this.AppoinmentBooking.AppNote = "sami testing";

this.AppoinmentBooking.SiteId = siteId;


this.AppoinmentBooking.LocationId = this.selectedLocation.locationid;
this.AppoinmentBooking.AppTypeId = this.selectedType.code;

this.AppoinmentBooking.AppCriteriaId  = 4;
this.AppoinmentBooking.AppStatusId  =1;

this.AppoinmentBooking.PatientStatusId  =this.selectedStatus.appstatusid;


this.AppoinmentBooking.ReferredProviderId  =this.selectedReferredBy.code;


this.AppoinmentBooking.IsPatientNotified  =true;

this.AppoinmentBooking.IsActive  =true;


this.AppoinmentBooking.EnteredBy  ="JohnDoe";


this.AppoinmentBooking.EntryDateTime  ="2023-05-25T13:46:49.728Z";

this.AppoinmentBooking.EntryDateTime  ="2023-05-25T13:46:49.728Z";

this.AppoinmentBooking.PatientNotifiedID=17;


this.AppoinmentBooking.RescheduledID=456;


this.AppoinmentBooking.ByProvider=true;


this.AppoinmentBooking.SpecialtyID=specialityId;


this.AppoinmentBooking.VisitStatusEnabled=false;


this.AppoinmentBooking.CPTGroupId=101;


this.AppoinmentBooking.OrderReferralId=-1;

this.AppoinmentBooking.PayerId=this.selectedPayer.problemid;
this.AppoinmentBooking.FacilityId=facilityId;


this.AppoinmentBooking.TelemedicineURL= "https://example.com/telemedicine";


   
    this.schservice.submitappointmentbooking(this.AppoinmentBooking).then(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment has been booked' });

    })

    
   
    console.log('Selected Purpose:', this.AppoinmentBooking);
  }



  Cancel(){

  }
 

}