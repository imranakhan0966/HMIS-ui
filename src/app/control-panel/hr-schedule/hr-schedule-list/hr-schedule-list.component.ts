import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrProvider } from 'src/app/services/control-panel/hrProvider.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { ProviderSchedule } from 'src/app/shared/control-panel/users';
@Component({
  selector: 'app-hr-schedule-list',
  templateUrl: './hr-schedule-list.component.html',
  styleUrls: ['./hr-schedule-list.component.css']
})
export class HrScheduleListComponent implements OnInit {

  position: string;

  availabilityfilter:boolean;
  filter:boolean;
  schedule:ProviderSchedule[];

  
facilities : any[];
selectedFacility:any;

hrEmployees: any[];
selectedEmployee:any;

clinicalUsage: any[];
selectedclinicalUsage:any;


appointmentType: any[];
selectedappointmentType:any;




sites: any[];
selectedSites:any;



active= [{ id: "1", name: "Active" }, { id: "0", name: "InActive" }];
selectedActive:any;

dailystartTime: Date;
dailyEndTime: Date;

selectedschedule:any;


  cacheItems :string[]= ['RegFacility','RegLocationTypes', 'HREmployee', 'ClinicalUsage','Provider','SchAppointmentType'];
 
  constructor(private providerService :HrProvider, private confirmationService: ConfirmationService,private router: Router,private userService:UsersService,private messageService: MessageService,private schedulingService:SchedulingService) { }


  ngOnInit(): void {
    this.FillCache();
this.GetProviderScheduleList();

  }

  ViewAvailability(schedule:any)
  {
    debugger
    this.selectedschedule=schedule;

   
this.availabilityfilter=true;
  }

 
  GetString(sch:any){
    return true;
  }
  

  buttonRoute(url:string){
    this.router.navigate([url]);
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


  
  
  GetProviderScheduleList(ProviderId?:number,SiteId?:number,FacilityId?:number,UsageId?:number,StartTime?:string,EndTime?:string)
  {
    this.schedule=[];
  this.selectedschedule=new ProviderSchedule();


    this.providerService.GetProviderScheduleList(ProviderId,SiteId,FacilityId,UsageId,StartTime,EndTime).then((list) => {
      console.log("GetProviderScheduleList");
  
  
    if(list.table1){

      this.schedule = list.table1;
    }
  
  
      console.log(list);
  

      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }


  ClickFilter(){
    this.filter=true;
  }
  
confirm(event: Event,Id:number,position: string) {

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
  this.providerService.DeleteProviderSchedule(Id).then((response)=>{
if(response.success){


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });
  this.GetProviderScheduleList();
}


}).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

}




submitFilter(){
this.GetProviderScheduleList(this.selectedEmployee?.code,this.selectedSites?.code,this.selectedFacility?.code,this.selectedclinicalUsage?.code,this.dailystartTime?.toISOString(),this.dailyEndTime?.toISOString())

}
}
