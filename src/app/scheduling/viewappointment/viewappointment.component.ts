import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listGridPlugin from '@fullcalendar/list';

import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import { AppointmentActions } from 'src/app/shared/scheduling/viewappointment';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { Facility } from 'src/app/shared/control-panel/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { Router } from '@angular/router';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.css']
})
export class ViewappointmentComponent implements OnInit {
  

  actions: AppointmentActions[];

    selectedAction: AppointmentActions| undefined;

  action: boolean;
  filter:boolean;
  reschpopup:boolean;
  cancelpopup:boolean;
  date: Date;


  dateSelected:any;

  appId:number;


appointments= [
//   { title: 'Appointment with Dr Abid', date: '2023-05-22' },
//  { title: 'Appointment with Dr Alia', date: '2023-05-25' }


];
  handleEventClick(clickInfo: EventClickArg) {

    debugger;

   let extProp:any = clickInfo.event._def.extendedProps;

   let appId = extProp.appId;
this.appId= appId;
   console.log(appId);

   this.action=true;

  }

  handleDateClick(clickInfo: DateClickArg) {
    // debugger;
    this.appId=0;
     this.action=true;
     this.dateSelected = clickInfo.dateStr;
    
//dateStr
  }

  
  handlePrevRender(ev: MouseEvent) {
   

  }

  
  handleTodayRender(ev: MouseEvent) {
   


  }

  
  handleWeekRender(ev: MouseEvent) {
  
  }

  
  handleMonthRender(ev: MouseEvent) {

  
  }

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin,
      dayGridPlugin,
      timeGrigPlugin,
      listGridPlugin,],
  
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
 
    initialView: 'dayGridMonth',
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    themeSystem: 'standard',
    dateClick:this.handleDateClick.bind(this),
   
    eventClick: this.handleEventClick.bind(this),
    // events: [ { title: 'event 1', date: '2023-06-07' },
    // { title: 'event 2', date: '2023-06-08' }]
    events: this.appointments,
   
    
  };
 
  calendarApi: any;
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






appointmentType:any[];
selectedappointmentType:any;

appointmentstatus: any[]=[];

selectedappointmentstatus: any;




appointmentcriteria: any[]=[];

selectedappointmentcriteria: any;




visitType: any[]=[];

selectedvisitType: any;


ReschedulingReasons:any[]=[];
selectedReschedulingReasons: any;




  cacheItems :string[]= ['ReschedulingReasons','RegLocations','RegLocationTypes','Provider','providerspecialty','RegFacility','SchAppointmentStatus','VisitType','SchAppointmentCriteria'];
  position: string;

  constructor(private confirmationService: ConfirmationService,private router: Router,private userService:UsersService,private messageService: MessageService,private schedulingService:SchedulingService) {



   }

  ngOnInit(): void {


    this.appointmentType = [
      { name: 'All Appointments', code: '0' },
      { name: 'Schedule Appointments', code: '1' },
      { name: 'Availability Appointments', code: '2' }
   
  ];
  this.FillCache();

  

  this.SearchAppointment(new Date().toISOString().split('T')[0]  ,new Date().toISOString().split('T')[0]);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  handleNextRender(ev: MouseEvent) {

   

  }



  parseDate(date:Date){
    return new Date(date).toDateString();
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



SearchAppointment(FromDate:string,ToDate:string,ProviderID?:number,LocationID?:number,SpecialityID?:number,SiteID?:number,FacilityID?:number,Page?:number,Size?:number){
  debugger
  this.schedulingService.searchAppointment(FromDate,ToDate,ProviderID,LocationID,SpecialityID,SiteID,FacilityID,Page,Size).then((appointment) => {
    console.log("SearchAppointments");

    console.log(appointment);


    if(appointment.table1){

      let appointments = [];

for(let i=0 ;i<appointment.table1.length;i++){
  let title = appointment.table1[i].appType;
    let date = appointment.table1[i].appointment_Date;
    let appId = appointment.table1[i].appointment_Id;
    let iconcolor='yellow';
    let backcolor = 'red'

   
    
appointments.push({date:date,title:title ,  color: '#ffafff',backgroundColor:'red' ,  

extendedProps: {
  appId: appId
 
}});


    
//appointments.push({date:date,title:title ,  color: '#ffafff',backgroundColor:'red'});
}

  


this.calendarOptions.events = appointments;

//this.calendarOptions.eventColor= '#378006'

//this.calendarOptions.eventBackgroundColor= '#378006' 
    

    }

else{

  this.calendarOptions.events=[];

  this.messageService.add({ severity: 'success', summary: '', detail: 'No Events Found' })
}
    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


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

let endMonth =  this.rangeDates? `${(this.rangeDates[1].getMonth()+1).toString().length<2? '0'+ (this.rangeDates[1].getMonth()+1) :this.rangeDates[1].getMonth()+1  }`:0;



let from = this.rangeDates ? (`${this.rangeDates[0].getUTCFullYear()}-${startMonth}-${this.rangeDates[0].getDate()}`): '2020-01-01';

let to =this.rangeDates ? (`${this.rangeDates[1].getUTCFullYear()}-${endMonth}-${this.rangeDates[1].getDate()}`): '2021-01-01';




this.SearchAppointment(from,to,pr,loc,sp,site,fa);


}

SubmitAction(){

  
debugger;
let selectionAction  = this.appointment;

switch(+selectionAction){

  case 0:
    this.router.navigateByUrl(`/scheduling/appointment/create?date=${this.dateSelected}`);

  break;


  case 1:
    this.router.navigate(['/scheduling/appointment/list']);

  break;


  case 2:


  
    this.action=false;
    this.reschpopup=false;
this.confirmCancel('bottom');


  break;


  case 3:
    this.action=false;
    this.reschpopup=true;
    this.cancelpopup=false;

  break;


}


this.action=false;

}


confirmCancel(position: string) {

  this.position=position;
  this.confirmationService.confirm({

      message: 'Are you sure that you want to cancel?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancelpopup=true;


      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
      key: 'positionDialog'
  });
}



cancelApp(){

  debugger;
  let ds = this.dateSelected;

this.changeAppointmentStatus(this.appId,3,false,this.selectedReschedulingReasons.code);
}


rescheduleApp(){

 
this.changeAppointmentStatus(this.appId,2,false,this.selectedReschedulingReasons.code,false);
}



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
