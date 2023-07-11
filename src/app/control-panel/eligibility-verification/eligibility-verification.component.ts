import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrProvider } from 'src/app/services/control-panel/hrProvider.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { EligilibityHistory } from 'src/app/shared/control-panel/users';

import{EligibilityService }from 'src/app/services/control-panel/eligibility.service'
@Component({
  selector: 'app-eligibility-verification',
  templateUrl: './eligibility-verification.component.html',
  styleUrls: ['./eligibility-verification.component.css']
})
export class EligibilityVerificationComponent implements OnInit {

  constructor(private EligibilityService:EligibilityService,private messageService: MessageService,) { }
  availabilityfilter:boolean;
  filter:boolean;
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
    this.elStatus=[{ id: "1", name: "Successfull" }, { id: "0", name: "Declined" }];
  }
  ClickFilter(){
    this.filter=true;
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

      this.schedule = list.table1;
    }
  
  
      console.log(list);
  

      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }

  submitFilter(){

    debugger
    let mrno = this.searchMr ?? null;
     let accountno = this.selectedVisitAccountNo?? null;
     let eligibility=this.selectedEligibilityId?? null;
     let status=this.selectedELStatusId?.name;
    // let pr = this.selectedProviders?.code;
    // let site = this.selectedSites?.code;

    let RequestDate = this.selectedMessageRequestDate?  `${(this.selectedMessageRequestDate.getMonth()+1).toString().length<2? '0'+ (this.selectedMessageRequestDate.getMonth()+1) :this.selectedMessageRequestDate.getMonth()+1  }`:0;
let MessageRequestDate = this.selectedMessageRequestDate ? (`${this.selectedMessageRequestDate.getUTCFullYear()}-${RequestDate}-${this.selectedMessageRequestDate.getDate()}`): null;


let ResponseDate =  this.selectedMessageResponseDate? `${(this.selectedMessageResponseDate.getMonth()+1).toString().length<2? '0'+ (this.selectedMessageResponseDate.getMonth()+1) :this.selectedMessageResponseDate.getMonth()+1  }`:0;




let MessageResponseDate =this.selectedMessageResponseDate ? (`${this.selectedMessageResponseDate.getUTCFullYear()}-${ResponseDate}-${this.selectedMessageResponseDate.getDate()}`): null;

    this.GetEligibilityHistoryList(mrno,accountno,eligibility,status?.name,MessageRequestDate?.toString(),MessageResponseDate?.toString())
    

    }
}

