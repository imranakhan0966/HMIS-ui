import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/common/api.service';
import { Family } from 'src/app/shared/scheduling/viewappointment';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  familyFilter:boolean;
  Family:Family [];

  constructor(private common:ApiService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.GetPatientFamilyByMRNo('1001');
  }
  openFamily(){
    this.familyFilter=true;
  }


    
GetPatientFamilyByMRNo(MrNo:string = '1001'){
  debugger
  this.common.getPatientFamilyByMRNo(MrNo).then((demographics) => {
    console.log("GetPatientHistoryByMRNo");

    console.log(demographics);
    if(demographics){

debugger;
      if(demographics.table1){


        this.Family = demographics.table1;


        
      }
    }


    
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}
  
}
