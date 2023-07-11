import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { DemographicsService } from 'src/app/services/registration/demographics.service';
import { Family } from 'src/app/shared/scheduling/viewappointment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  History:History[];

  
  historyFilter:boolean;
  constructor(private userService:UsersService,public demoGrpahicsService:DemographicsService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetPatientHistoryByMRNo('1001');

  }

  
  openHistory(){
    this.historyFilter=true;

  }
  


  
GetPatientHistoryByMRNo(MrNo:string = '1001'){
  debugger
  this.demoGrpahicsService.getPatientHistoryByMRNo(MrNo).then((demographics) => {
    console.log("GetPatientHistoryByMRNo");

    console.log(demographics);
    if(demographics){
debugger;

      if(demographics.table1){


        this.History = demographics.table1;


        
      }
    }


    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}

}
