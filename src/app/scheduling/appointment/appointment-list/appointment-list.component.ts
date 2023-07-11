import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {


  
  startDate: string;
  calendarComponent: any;

  appointment: string;



  rangeDates: Date[];


  facilities : any[];
  selectedFacility:any;



  
speciality: any[];

selectedSpeciality: any;



provider: any[];

selectedProviders: any;



sites: any[];

selectedSites: any;



locations: any[];

selectedLocations: any;



filter:boolean;


appointmentType:any[];
selectedappointmentType:any;

appointmentstatus: any[]=[];

selectedappointmentstatus: any;




appointmentcriteria: any[]=[];

selectedappointmentcriteria: any;




visitType: any[]=[];

selectedvisitType: any;


appointments:any[]=[];


ReschedulingReasons:any[]=[];
selectedReschedulingReasons: any;



appId:number;

reschpopup:boolean;
cancelpopup:boolean;
date: Date;



  cacheItems :string[]= ['ReschedulingReasons','RegLocations','RegLocationTypes','Provider','providerspecialty','RegFacility','SchAppointmentStatus','VisitType','SchAppointmentCriteria'];

  

  position: string;
  constructor(private confirmationService: ConfirmationService,private router: Router,private userService:UsersService,private messageService: MessageService,private schedulingService:SchedulingService) { }

  ngOnInit(): void {

    
    this.appointmentType = [
      { name: 'All Appointments', code: '0' },
      { name: 'Schedule Appointments', code: '1' },
      { name: 'Availability Appointments', code: '2' }
   
  ];
  this.FillCache();

  

  this.SearchAppointment(new Date().toISOString().split('T')[0]  ,new Date().toISOString().split('T')[0]);
  }


  

ClickFilter(){

  this.filter=true;
}



SubmitFilter(){
this.filter=false;
debugger
let fa = this.selectedFacility?.code;
let sp = this.selectedSpeciality?.code;
let pr = this.selectedProviders?.code;
let site = this.selectedSites?.code;

let loc = this.selectedLocations?.code;



let startMonth = this.rangeDates?  `${(this.rangeDates[0].getMonth()+1).toString().length<2? '0'+ (this.rangeDates[0].getMonth()+1) :this.rangeDates[0].getMonth()+1  }`:0;
let from = this.rangeDates ? (`${this.rangeDates[0].getUTCFullYear()}-${startMonth}-${this.rangeDates[0].getDate()}`): '2020-01-01';

let endMonth =  this.rangeDates? `${(this.rangeDates[1].getMonth()+1).toString().length<2? '0'+ (this.rangeDates[1].getMonth()+1) :this.rangeDates[1].getMonth()+1  }`:0;




let to =this.rangeDates ? (`${this.rangeDates[1].getUTCFullYear()}-${endMonth}-${this.rangeDates[1].getDate()}`): '2021-01-01';




this.SearchAppointment(from,to,pr,loc,sp,site,fa);


}




SearchAppointment(FromDate:string,ToDate:string,ProviderID?:number,LocationID?:number,SpecialityID?:number,SiteID?:number,FacilityID?:number,Page?:number,Size?:number){
  debugger
  this.schedulingService.searchAppointment(FromDate,ToDate,ProviderID,LocationID,SpecialityID,SiteID,FacilityID,Page,Size).then((appointment) => {
    console.log("SearchAppointments");

    console.log(appointment);


    if(appointment.table1){
debugger;
      let appointments = [];

for(let i=0 ;i<appointment.table1.length;i++){



appointments.push({

  appointment_Id:appointment.table1[i].appointment_Id,
  mrNo:appointment.table1[i].mrNo,
  patient_FName:appointment.table1[i].patient_FName,
  appDateTime:appointment.table1[i].appDateTime,
  appointment_SiteName:appointment.table1[i].appointment_SiteName,
  appType:appointment.table1[i].appType,
  appointment_PatientStatus:appointment.table1[i].appointment_PatientStatus,
  purposeOfVisit:  appointment.table1[i].purposeOfVisit



});







}

  

this.appointments = appointments;
    
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
debugger
 
let jParse=  JSON.parse(JSON.stringify(response)).cache;
let location  = JSON.parse(jParse).RegLocations;
let sites  = JSON.parse(jParse).RegLocationTypes;
let speciality  = JSON.parse(jParse).providerspecialty;

let provider  = JSON.parse(jParse).Provider;

let regFacility  = JSON.parse(jParse).RegFacility;

let SchAppointmentStatus = JSON.parse(jParse).SchAppointmentStatus;



let SchAppointmentCriteria = JSON.parse(jParse).SchAppointmentCriteria;

let VisitType = JSON.parse(jParse).VisitType;

let ReschedulingReasons = JSON.parse(jParse).ReschedulingReasons;




if(ReschedulingReasons){
 
  
  ReschedulingReasons = ReschedulingReasons.map((item: { ReSchId : any; Reasons: any; }) => {
      return {
        name: item.Reasons,
        code: item.ReSchId
      };
    });
  
      this.ReschedulingReasons = ReschedulingReasons;
  }




if(SchAppointmentCriteria){
 
  
  SchAppointmentCriteria = SchAppointmentCriteria.map((item: { CriteriaId : any; CriteriaName: any; }) => {
      return {
        name: item.CriteriaName,
        code: item.CriteriaId
      };
    });
  
      this.appointmentcriteria = SchAppointmentCriteria;
  }





  
if(VisitType){
 
  
  VisitType = VisitType.map((item: { VisitTypeId : any; VisitTypeName: any; }) => {
      return {
        name: item.VisitTypeName,
        code: item.VisitTypeId
      };
    });
  
      this.visitType = VisitType;
  }




if(SchAppointmentStatus){
 
  
  SchAppointmentStatus = SchAppointmentStatus.map((item: { AppStatusId : any; AppStatus: any; }) => {
      return {
        name: item.AppStatus,
        code: item.AppStatusId
      };
    });
  
      this.appointmentstatus = SchAppointmentStatus;
  }



  
if(provider){


  provider = provider.map((item: { EmployeeId : any; FullName: any; }) => {
      return {
        name: item.FullName,
        code: item.EmployeeId
      };
    });
  
      this.provider = provider;
  }

 


if(location){


  location = location.map((item: { LocationId : any; Name: any; }) => {
      return {
        name: item.Name,
        code: item.LocationId
      };
    });
  
      this.locations = location;
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



    if(speciality){


      speciality = speciality.map((item: { SpecialtyID : any; SpecialtyName: any; }) => {
          return {
            name: item.SpecialtyName,
            code: item.SpecialtyID
          };
        });
      
          this.speciality = speciality;
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

buttonRoute(url:string){
  this.router.navigate([url]);
}



Reschedule(event: Event,appointment:any,position: string) {

  this.appId = +appointment.appointment_Id;

  this.cancelpopup=false;
  this.reschpopup=true; 
}

confirmCancel(event: Event,appointment:any,position: string) {

  this.position=position;
  this.confirmationService.confirm({

      message: 'Are you sure that you want to cancel?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
     
       // this.Remove(Id);
    

       this.appId = +appointment.appointment_Id;

       this.cancelpopup=true;
       this.reschpopup=false;

      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
      key: 'positionDialog'
  });
}





cancelApp(){

  debugger;

this.changeAppointmentStatus(this.appId,3,false,this.selectedReschedulingReasons.code);
}


rescheduleApp(){

 
this.changeAppointmentStatus(this.appId,2,false,this.selectedReschedulingReasons.code,false);
}



//  this.changeAppointmentStatus(appointment.appointment_Id,3,false,this.selectedReschedulingReasons.code);


changeAppointmentStatus(AppId:number,AppStatusId:number ,ByProvider:boolean,RescheduledId:number,isCancel:boolean=true){
  

  this.cancelpopup=false;
this.reschpopup=false;

  this.schedulingService.cancelBooking(AppId,AppStatusId,ByProvider,RescheduledId).then((appointment) => {
    console.log("cancel app");

    console.log(appointment);

    this.messageService.add({ severity: 'success', summary: 'Success', detail: isCancel? 'Appointment Successfully Cancelled': 'Appointment Successfully Rescheduled' });
  this.cancelpopup=false;
    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}
 



}
