import { ActivatedRoute } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { AppointmentHistory } from 'src/app/shared/scheduling/viewappointment';

@Component({
  selector: 'app-appointmenthistory',
  templateUrl: './appointmenthistory.component.html',
  styleUrls: ['./appointmenthistory.component.css']
})
export class AppointmenthistoryComponent implements OnInit {


  history : AppointmentHistory[];
  constructor(private activatedRoute:ActivatedRoute ,private confirmationService: ConfirmationService,private router: Router,private userService:UsersService,private messageService: MessageService,private schedulingService:SchedulingService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const mrNo = params['mrNo'];
    
      if(mrNo){
        this.SearchAppointmentHistory(mrNo);
      }
    
 
     
    
    })
  }




  

SearchAppointmentHistory(MRNo:string,ProviderId?:number,PatientStatusId?:number,AppStatusId?:number,Page?:number,Size?:number,SortColumn?:string,SortOrder?:string){
  debugger
  this.schedulingService.searchAppointmentHistory(MRNo,ProviderId,PatientStatusId,AppStatusId,Page,Size,SortColumn,SortOrder).then((history) => {
    console.log("SearchAppointmentsHistory");
let dt = history;
    if(dt){

      let count = dt.table1;
      let history = dt.table2;

      this.history = history;

    }
    console.log(history);





    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}

}
