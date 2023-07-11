import { Component, OnInit } from '@angular/core';
import { CoverageService } from 'src/app/services/registration/coverage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { stream } from 'xlsx';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.css']
})
export class CoveragesComponent implements OnInit {




  coverages:any;

  inssub:any;



  coveragesarray:any[]=[];


  insuredsubs:any[]=[];


  subscriberinfo:any;


  searchMr:string;


   type:any[];

  selectedtype:any;

  LastName:any ;

  InsuranceIdNo:any ;

  filter:boolean;

  mrNo:string;
  
  selectedssn:string;


  constructor(private coverage: CoverageService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    debugger
   // this.GetCoverage("1006");

   // this.GetSearch(1, "", "", 2, 10);

    this.type= [
      { label: '[Both]', value: '0' },
      { label: 'Person', value: '1' },
      { label: 'Non Person', value: '2' }
      // Add more options as needed
    ];


  }


  GetCoverage(MrNo:string){
    debugger
    this.coverage.GetCoverage(MrNo).then((coverages) => {
      console.log("getcoverages");
  
  
    
  
      console.log(coverages);
  
  debugger
  
  
      if(coverages.table1){
        debugger;
              let coveragesvararray = [];
        
        for(let i=0 ;i<coverages.table1.length;i++){
        
        
        
          coveragesvararray.push({
        
            type:coverages.table1[0].type,
            subscriberName:coverages.table1[i].subscriberName,
            payerName:coverages.table1[i].payerName,
            memberId:coverages.table1[i].memberId,
            plan:coverages.table1[i].plan,
            terminationDate:coverages.table1[i].terminationDate,
            careerAddress:coverages.table1[i].careerAddress,
            relationCode:  coverages.table1[i].relationCode,
            priority:  coverages.table1[i].priority
        
        
        
        });

        
}

  

this.coveragesarray = coveragesvararray;
    
    }

      
  }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  
  }

  DATE:any

  GetSearch(searchMr:string,CompanyOrIndividual: any, LastName?: any, SSN?:any, InsuredIDNo?: any, PageNumber?: number, PageSize?: number) {
    debugger;
    this.coverage.GetSearch(CompanyOrIndividual, LastName, SSN, InsuredIDNo , searchMr,PageNumber, PageSize)
      .then((inssub) => {
        console.log("InsuredSubscriber");

        //inssub = this.DATE

        console.log(inssub);
        debugger;
  
        if (inssub.table1) {
          debugger;
          let inssubarray: any[] = [];
  
          for (let i = 0; i < inssub.table1.length; i++) {

            let subscriberName= inssub.table1[i].subscriberName;
            let insuranceCarrier= inssub.table1[i].insuranceCarrier;
            let insuredIDNo= inssub.table1[i].insuredIDNo;
       
            let type=inssub.table1[i].type;
            let  active=inssub.table1[i].active;
            let  carrierAddress= inssub.table1[i].carrierAddress;
            let mrNo= inssub.table1[i].mrNo;
            inssubarray.push
             ({
              subscriberName: inssub.table1[i].subscriberName,
              insuranceCarrier: inssub.table1[i].insuranceCarrier,
              insuredIDNo: inssub.table1[i].insuredIDNo,
              mrNo: inssub.table1[i].mrNo,
              type: inssub.table1[i].type,
              active: inssub.table1[i].active,
              carrierAddress: inssub.table1[i].carrierAddress
            });
          }
  
          this.insuredsubs = inssubarray ;
        }
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
  }

  


  search(){


    debugger

    if(this.searchMr){

    
    // this.GetCoverage(this.searchMr);
    console.log("selectedtype", this.selectedtype);
  console.log("selectedtype.code", this.selectedtype?.code);
  let la = this.LastName;
  let st = this.selectedtype;
  let ssN= this.selectedssn;
  let iin = this.InsuranceIdNo;
  let mrno = this.searchMr;
  this.searchsubscriberinfo(la,st,ssN,iin,mrno);
    // this.GetSearch(this.searchMr, this.selectedtype, this.LastName, this.LastName);
  //  this.GetPatientHistoryByMRNo(this.searchMr);
    }

  }

  
  



  // ClickFilter(){

  //   this.filter=true;
  // }



  
SubmitFilter(){
  this.filter=false;
  debugger

  


}
  
  
//   
  
  
//   }


  searchsubscriberinfo(LastName:string, selectedtype:any, Ssn:string, InsuranceIdNo: string, MRNo:any){
    debugger


    // this.LastName = " "
    // this.InsuranceIdNo = " "

    if(LastName != null && selectedtype==null && InsuranceIdNo==null|| LastName != undefined && selectedtype==undefined && InsuranceIdNo==undefined){
      selectedtype = ' '
      InsuranceIdNo = ' '
      this.GetSearch(selectedtype, LastName,  Ssn,InsuranceIdNo,MRNo, 1, 500);
    }

    else if(InsuranceIdNo != null  && selectedtype == null && LastName==null || InsuranceIdNo != undefined && selectedtype == undefined && LastName==undefined ){
      selectedtype = ' '
      LastName = ' '
      this.GetSearch(selectedtype, LastName, Ssn, InsuranceIdNo,MRNo, 1, 500);
    }

    else if(selectedtype != null && InsuranceIdNo==null && LastName==null || selectedtype != undefined  && InsuranceIdNo==undefined && LastName==undefined ){
      InsuranceIdNo = ' '
      LastName = ' '
      this.GetSearch(selectedtype, LastName, Ssn, InsuranceIdNo, MRNo, 1, 500);
    }





    else if(InsuranceIdNo != null && LastName != null  || InsuranceIdNo != undefined && LastName != undefined ){
      selectedtype = ' '
      this.GetSearch(selectedtype, LastName,Ssn, InsuranceIdNo, MRNo, 1, 500);
    }

    else if(InsuranceIdNo != null && selectedtype != null  || InsuranceIdNo != undefined && selectedtype != undefined  ){
      
      LastName = ' '
      this.GetSearch(this.selectedtype, this.LastName, Ssn, this.InsuranceIdNo, MRNo, 1, 500);
    }


    else if(selectedtype != null && LastName != null  || selectedtype != undefined && LastName != undefined ){
      InsuranceIdNo = ' '
      this.GetSearch(selectedtype, LastName, Ssn, InsuranceIdNo, MRNo, 1, 500);
    }

    else
    {
       


   // var abc = "";




      this.GetSearch(MRNo, 1, "", "","", 1, 500);



    }


  }
 




  //   else{
      
  //     // this.LastName = ' '
  //     // this.InsuranceIdNo = ' '
  //     this.GetSearch(selectedtype, LastName, InsuranceIdNo, "1", 500);
  //   }
      
  
    

  // }


  // searchMrEvent(event:any){


  //   this.mrNo = event;

  

  
  // }
 

  

  // buttonRoute(url:string){
  //   this.router.navigate([url]);
  // }


  
}


