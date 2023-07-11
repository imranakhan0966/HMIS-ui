import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/common/api.service';
import { HrProvider } from 'src/app/services/control-panel/hrProvider.service';
// import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hr-schedule-create',
  templateUrl: './hr-schedule-create.component.html',
  styleUrls: ['./hr-schedule-create.component.css']
})
export class HrScheduleCreateComponent implements OnInit {

  ProviderSchedule: any =  {

  
  }
  constructor(private commonService:ApiService, private route: ActivatedRoute,private HrProvider:HrProvider, private userService:UsersService,private messageService: MessageService,private confirmationService: ConfirmationService) { }
  dayBreakDisable:boolean=true;
  validityDateDisable:boolean=true;
  appointmentHourDisable:boolean=false;
  appointmentTypeDisable:boolean=false;

  all:boolean=false;
  sunday:boolean=false;
  monday:boolean=false;
  tuesday:boolean=false;
  wednesday:boolean=false;
  thursday:boolean=false;
  friday:boolean=false;
  saturday:boolean=false;

  dailystartTime: Date;
  dailyEndTime: Date;
  validDateFrom:Date;
  validDateTo:Date;
  breakReason:string;

  daybreakStartTime: Date;
  daybreakEndTime: Date;
  sites: any[];
selectedSites: any;


facilities : any[];
selectedFacility:any;

hrEmployees: any[];
selectedEmployee:any;

clinicalUsage: any[];
selectedclinicalUsage:any;

appointmentType: any[];
selectedAppointmentType:any;

duration:any[];
selectedDuration:any;

cptGroup:any[];
selectedCptGroup:any;

includeDayBreak= [{ id: "1", name: "Yes" }, { id: "0", name: "No" }];
selectedincludeDayBreak:any;

active= [{ id: "1", name: "Active" }, { id: "0", name: "InActive" }];
selectedActive:any;

validity= [{ id: "1", name: "Yes" }, { id: "0", name: "No" }];
selectedValidity:any;

appointmentHour_Type= [{ id: "1", name: "Appointment Hour" }, { id: "2", name: "Appointment By Type" }];
selectedAppointmentHour_Type:any;

appointmenthour= [ { id: "1", name: "1" },{ id: "2", name: "2" },{ id: "3", name: "3" },{ id: "4", name: "4" },{ id: "6", name: "6" },{ id: "12", name: "12" }];
selectedAppointmenthour:any;



appointmentbytype:any=[];

maxOverloadApps:string;
myList: number[] = [];
position: string;
psid:number;
// [{ appTypeName:"Consultation (15 minuts)",appTypeId: "1",durationName:"30" ,durationId: "1",cptGroupName:"New Patient",cptGroupId:"1" }];

  ngOnInit(): void {

    this.FillCache();
    this.duration=[];

   // this.duration=[{ id: "1", name: "5" }, { id: "2", name: "10" },{ id: "3", name: "15" }];
   // this.appointmentType=[{ id: "1", name: "Consultation (15 minuts)" }, { id: "2", name: "Consultation (Complex 30 minuts)" },{ id: "3", name: "Surgery" }];
    this.cptGroup=[{ id: "1", name: "New Patient Consult" }, { id: "2", name: "Follow consultation" }];
    // if(dt.date){
        
    //   this.date =  new Date(dt.date);
    // }

    let value = 0;
    let durationId=0;
    debugger
    while (value < 180) {  // Adjust the condition as needed
    
      value += 5;
      durationId+=1;

     
      this.myList.push(value);

      const item = {
        id: durationId,
        name:value,
      };
     this.duration.push(item);
     
    }
   
  }
  cacheItems :string[]= ['RegFacility','RegLocationTypes', 'HREmployee', 'ClinicalUsage','Provider','SchAppointmentType'];


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
    let regFacility  = JSON.parse(jParse).RegFacility;
    let sites  = JSON.parse(jParse).RegLocationTypes;
    let hrEmployee  = JSON.parse(jParse).HREmployee;
    let clinicalUsage  = JSON.parse(jParse).ClinicalUsage;
    let provider  = JSON.parse(jParse).Provider;
    let SchAppointmentType  = JSON.parse(jParse).SchAppointmentType;
    debugger
    if(SchAppointmentType){


      SchAppointmentType = SchAppointmentType.map((item: { AppTypeId : any; AppType: any; }) => {
          return {
            name: item.AppType,
            code: item.AppTypeId
          };
        });
      
          this.appointmentType = SchAppointmentType;
      }
    
    if(provider){


      provider = provider.map((item: { EmployeeId : any; FullName: any; }) => {
          return {
            name: item.FullName,
            code: item.EmployeeId
          };
        });
      
          this.hrEmployees = provider;
      }
    
    if(clinicalUsage){
  
  
      clinicalUsage = clinicalUsage.map((item: { ClinicalUsageId : any; ClinicalUsage: any; }) => {
          return {
            name: item.ClinicalUsage,
            code: item.ClinicalUsageId
          };
        });
      
          this.clinicalUsage = clinicalUsage;
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




 


  // selectDefaultDate(){
  //   if(!this.startHourValue)
  //   this.startHourValue=this.defaultDate;
  //   }


  enableBreakTime(value:any): void
  {
    debugger
    var Id=value.value.id;

    if(Id=="0")
    {
      this.dayBreakDisable=true;

    }
    else{
      this.dayBreakDisable=false;

    }

  }

  enableValidity(value:any): void
  {
    debugger
    var Id=value.value.id;

    if(Id=="0")
    {
      this.validityDateDisable=true;

    }
    else{
      this.validityDateDisable=false;

    }

  }

  appointment(value:any): void
  {
    debugger
    var Id=value.value.id;

    if(Id=="1")
    {
      this.appointmentHourDisable=false;
      this.appointmentTypeDisable=true;

    }
    else{
      this.appointmentHourDisable=true;
      this.appointmentTypeDisable=false;

    }

  }


  public change() {
    console.log(this.all ? "Checked" : "Unchecked");

    var value=(this.all ? "Checked" : "Unchecked");
    if(value=="Checked")
    {
      this.sunday=true;
      this.monday=true;
      this.tuesday=true;
      this.wednesday=true;
      this.thursday=true;
      this.friday=true;
      this.saturday=true;

    }
    else{
      this.sunday=false;
      this.monday=false;
      this.tuesday=false;
      this.wednesday=false;
      this.thursday=false;
      this.friday=false;
      this.saturday=false;

    }
  }
convertDatetime(date:Date)
{
  var am_PM="";
 var hour;
 var Minutes;
  if(date.getHours() > 12)
  {
   am_PM="PM";

   hour=date.getHours()-12;

   if(hour<10)
   {
    hour="0"+ hour;

   }
  }
  else
  {
   am_PM="AM"
   hour=date.getHours();
  }
  if(date.getMinutes()<10)
  {
    Minutes="0"+date.getMinutes();
  }
  else
  {
    Minutes=date.getMinutes();
  }

 //  const AMPM ="";
 //  if (AMPM == "PM" && hours < 12) hours = hours + 12;
 //  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var Time= hour + ":" + Minutes+" " +am_PM;
  return Time;
}
  submit() {
    debugger
    var providerId=this.selectedEmployee.code;
   
    var siteId=this.selectedSites.code;
    var UsageId=this.selectedclinicalUsage.code;
  
    //var dailystartTime= this.convertDatetime(this.dailystartTime);
    var Appointmenthour=this.selectedAppointmenthour;

   var appointbytypeList = this.appointmentbytype.map((item: {recordId: any; appTypeId : any; durationName: any; cptGroupId: any;}) => {
      return {
        psid:this.psid,
        appTypeId: parseInt(item.appTypeId),
        duration:parseInt(item.durationName),
        cptGroupId:parseInt(item.cptGroupId),
      };
    });
  
    //var tim=this.datePipe.transform(ttttt, 'HH:mm:ss');
   // var tm=this.datePipe.transform(ttttt, 'HH:mm a');
  
    
    if(this.selectedEmployee =='' || this.selectedEmployee ==undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Employee' });
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
              
    this.ProviderSchedule.ProviderId=providerId;
    this.ProviderSchedule.SiteId=siteId;
    this.ProviderSchedule.UsageId=UsageId;
    if(this.dailystartTime !=null  && this.dailystartTime!=undefined)
    {
    this.ProviderSchedule.startTime=this.convertDatetime(this.dailystartTime);
    }
    if(this.dailyEndTime !=null && this.dailyEndTime!=undefined)
    {
    this.ProviderSchedule.endTime=this.convertDatetime(this.dailyEndTime);
    }
    this.ProviderSchedule.startDate=this.validDateFrom;
    this.ProviderSchedule.endDate=this.validDateTo;

    if(this.daybreakStartTime !=null && this.daybreakStartTime!=undefined)
    {
    this.ProviderSchedule.breakStartTime=this.convertDatetime(this.daybreakStartTime);
    }
    if(this.daybreakEndTime !=null && this.daybreakEndTime!=undefined)
    {
    this.ProviderSchedule.breakEndTime=this.convertDatetime(this.daybreakEndTime);
    }
    this.ProviderSchedule.breakReason=this.breakReason;

    if(this.selectedAppointmenthour!=null && this.selectedAppointmenthour!=undefined)
    {
    this.ProviderSchedule.appPerHour=this.selectedAppointmenthour.name;
    }
    this.ProviderSchedule.maxOverloadApps=this.maxOverloadApps;
    this.ProviderSchedule.sunday=this.sunday;
    this.ProviderSchedule.monday=this.monday;
    this.ProviderSchedule.tuesday=this.tuesday;
    this.ProviderSchedule.wednesday=this.wednesday;
    this.ProviderSchedule.thursday=this.thursday;
    this.ProviderSchedule.friday=this.friday;
    this.ProviderSchedule.saturday=this.saturday;

    if( this.selectedActive!=null &&  this.selectedActive!=undefined)
    {
      if(this.selectedActive.Id==1)
      {
        this.ProviderSchedule.active=true;
      }
      else{
        this.ProviderSchedule.active=false;
      }
    }
    //this.ProviderSchedule.priority=1;


    this.ProviderSchedule.providerScheduleByAppType=appointbytypeList;
    debugger

    this.HrProvider.InsertProviderSchedule(this.ProviderSchedule).then(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Schedule has been created' });

    })

    // "psId": 0,
    
   
    // "priority": 0,
    // "active": true,
    // "createdBy": "string",
    // "updatedBy": "string",
   
   




   
    // this.schservice.submitappointmentbooking(this.AppoinmentBooking).then(response => {
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment has been booked' });

    // })

    
   
//     console.log('Selected Purpose:', this.AppoinmentBooking);
  }

  appointbytypeList:any=[];
  addAppointtype()
  {
    var appointtype=this.selectedAppointmentType;
    var duration=this.selectedDuration;
    var CptGroup=this.selectedCptGroup;
debugger
    this.appointmentbytype.push({
      recordId:'1',
      
      appTypeId:appointtype.code,
      appTypeName:appointtype.name,
      durationId:duration.id,
      durationName:duration.name,
      cptGroupId:CptGroup.id,
      cptGroupName:CptGroup.name

    });
    

   
    

  }
  onRowEditInit(event: Event,Id:number) {

    debugger
  }


  confirm(event: Event,Id:number,position: string) {
debugger
    this.position=position;
    this.confirmationService.confirm({
  
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
  
          this.Remove(Id);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
        key: 'positionDialog'
    });
  }

  
Remove(Id:number){
  debugger

  const index = this.appointmentbytype.findIndex((x: { recordId: number; }) => x.recordId === Id);
  const deleterecord=this.appointmentbytype.find((x: { recordId: number; }) => x.recordId  === Id)
  if (index !== -1) {
    this.appointmentbytype.splice(index, 1);
  }
//   this.userService.removeEmployees(Id).then((response)=>{
// if(response.success){


//         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });
//   this.loadEmployees();
// }


// }).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}


FillProviderSchedule(EmployeeId:number){

  this.HrProvider.GetProviderScheduleByPSId(EmployeeId).then((schedule) => {
debugger
var scheduleData=schedule;
  })};
  schedulebyId(value:any): void
  {
   debugger
   var Id=value.code;
   this.FillProviderSchedule(parseInt(Id));
  }
}
