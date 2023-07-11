import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/common/api.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { DemographicsService } from 'src/app/services/registration/demographics.service';
import { Family } from 'src/app/shared/scheduling/viewappointment';

@Component({
  selector: 'app-paitentdemographics',
  templateUrl: './paitentdemographics.component.html',
  styleUrls: ['./paitentdemographics.component.css']
})
export class PaitentdemographicsComponent implements OnInit {

  History:Family[];
  Family: History[];
  Detail:any;
  searchMr:string;

  SubDetail:any;
  PreSubDetail:any;


  public imageData: string;
  @Output() mrSearchEvent = new EventEmitter<string>();

  constructor(private userService:UsersService,public demoGrpahicsService:DemographicsService,private confirmationService: ConfirmationService,private messageService: MessageService, public apiService:ApiService) { }

  ngOnInit(): void {
  }


  search(){


    if(this.searchMr){
      this.Detail = {};
      this.Family=[];
      this.History=[];
    
    this.GetDemographicsByMRNo(this.searchMr);
    this.GetPatientHistoryByMRNo(this.searchMr);
    }
  
  
  }




  
  GetDemographicsByMRNo(MrNo:string = ''){
    debugger
    this.apiService.getCoverageAndRegPatient(MrNo).then((demographics) => {
      console.log("GetDemographicsByMRNo");
  
  this.mrSearchEvent.emit(MrNo);
    
  
      console.log(demographics);
  
  
  
  
      if(demographics){
  
  
  if(demographics.table1){
  debugger
    this.Detail = demographics.table1[0];
  }
  
  
  // if(demographics.table2){
  // debugger
  //   this.PreSubDetail = demographics.table2[0];
  // }
  
  if(demographics.table1){
  debugger
    this.SubDetail = demographics.table1[0];
    
  }
  
  
  
  
  // if(demographics.table5){
  //   this.Family =  demographics.table5;
  
   
  
  
  // }
  
      }
      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }
  
  
  GetPatientHistoryByMRNo(MrNo:string = '1001'){
    debugger
    this.demoGrpahicsService.getPatientHistoryByMRNo(MrNo).then((demographics) => {
      console.log("GetPatientHistoryByMRNo");
  
      console.log(demographics);
      if(demographics){
  
  
        if(demographics.table1){
  
  
          this.History = demographics.table1;
  
  
          
        }
      }
  
  
      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }

}