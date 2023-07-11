import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrProvider } from 'src/app/services/control-panel/hrProvider.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { EligilibityHistory } from 'src/app/shared/control-panel/users';
import{EligibilityService }from 'src/app/services/control-panel/eligibility.service'
@Component({
  selector: 'app-eligibility-history',
  templateUrl: './eligibility-history.component.html',
  styleUrls: ['./eligibility-history.component.css']
})
export class EligibilityHistoryComponent implements OnInit {

  constructor(private EligibilityService:EligibilityService,private messageService: MessageService,) { }
  availabilityfilter:boolean;
  filter:boolean;
  selectedeligibility:any;
  schedule:EligilibityHistory[];


  selectedMRNo:any;  ;
  selectedVisitAccountNo:any; 
  selectedEligibilityId:any;  
  selectedELStatusId:any; 
  selectedMessageRequestDate: Date;
  selectedMessageResponseDate: Date;

  ngOnInit(): void {
  }
  ClickFilter(){
    this.filter=true;
  }

  GetEligibilityHistoryList(MRNo?:string,VisitAccountNo?:number,EligibilityId?:number,ELStatusId?:number,MessageRequestDate?:string,MessageResponseDate?:string)
  {
    this.schedule=[];
  this.selectedeligibility=new EligilibityHistory();


    this.EligibilityService.BLEligibilityLogs(MRNo,VisitAccountNo,EligibilityId,ELStatusId,MessageRequestDate,MessageResponseDate).then((list) => {
      console.log("GetProviderScheduleList");
  
  
    if(list.table1){

      this.schedule = list.table1;
    }
  
  
      console.log(list);
  

      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }

  submitFilter(){
    let RequestDate = this.selectedMessageRequestDate?  `${(this.selectedMessageRequestDate.getMonth()+1).toString().length<2? '0'+ (this.selectedMessageRequestDate.getMonth()+1) :this.selectedMessageRequestDate.getMonth()+1  }`:0;
let MessageRequestDate = this.selectedMessageRequestDate ? (`${this.selectedMessageRequestDate.getUTCFullYear()}-${RequestDate}-${this.selectedMessageRequestDate.getDate()}`): '2020-01-01';


let ResponseDate =  this.selectedMessageResponseDate? `${(this.selectedMessageResponseDate.getMonth()+1).toString().length<2? '0'+ (this.selectedMessageResponseDate.getMonth()+1) :this.selectedMessageResponseDate.getMonth()+1  }`:0;




let MessageResponseDate =this.selectedMessageResponseDate ? (`${this.selectedMessageResponseDate.getUTCFullYear()}-${ResponseDate}-${this.selectedMessageResponseDate.getDate()}`): '2021-01-01';

    this.GetEligibilityHistoryList(this.selectedMRNo?.code,this.selectedVisitAccountNo?.code,this.selectedEligibilityId?.code,this.selectedELStatusId?.code,MessageRequestDate,MessageResponseDate)
    

    }
}
