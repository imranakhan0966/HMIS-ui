import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/services/common/environment.service';
import { SidenavbarService } from 'src/app/services/common/sidenavbar.service';


import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrProvider } from 'src/app/services/control-panel/hrProvider.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { EligilibityHistory, ProviderSchedule } from 'src/app/shared/control-panel/users';
import{EligibilityService }from 'src/app/services/control-panel/eligibility.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filter:boolean;
  constructor(private sidebarService: SidenavbarService,private environmentService:EnvironmentService,private EligibilityService:EligibilityService,private messageService: MessageService,) {

    this.environmentService.checkLoginStatusAndRoute();
		this.environmentService.setPermissions();
    this.sidebarService.toggleSidebarVisibility(true);
   }
   selectedeligibility:any;
   schedule:EligilibityHistory[];
 
 
   selectedMRNo:string;  
   selectedVisitAccountNo:number; 
  
   selectedEligibilityId:number;  
   selectedELStatusId:any; 
   selectedMessageRequestDate: Date;
   selectedMessageResponseDate: Date;
 
   elStatus:any=[];
   searchMr:string;
 
   MessageRequestDate:string
  ngOnInit(): void {
   this.GetEligibilityHistoryList();
  
  }
  GetEligibilityHistoryList(MRNo?:string,VisitAccountNo?:number,EligibilityId?:number,ELStatusId?:number,MessageRequestDate?:string,MessageResponseDate?:string)
  {
    debugger
    this.schedule=[];
  this.selectedeligibility=new EligilibityHistory();


    this.EligibilityService.BLEligibilityLogs(MRNo,VisitAccountNo,EligibilityId,ELStatusId,MessageRequestDate,MessageResponseDate).then((list) => {
      console.log("GetProviderScheduleList");
  debugger
  
    if(list.table1){

      this.schedule = list.table1.filter((element: { elStatus: any;createdBy:any }) => element.elStatus == "Successful" && element.createdBy =="2nd Api");
    }
  
  
      console.log(list);
  

      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }
  ClickFilter(){
    this.filter=true;
  }
}
