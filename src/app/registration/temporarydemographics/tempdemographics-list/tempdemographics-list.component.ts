import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TempdemographicsService } from 'src/app/services/registration/tempdemographics.service';

@Component({
  selector: 'app-tempdemographics-list',
  templateUrl: './tempdemographics-list.component.html',
  styleUrls: ['./tempdemographics-list.component.css']
})
export class TempdemographicsListComponent implements OnInit {


  tempObj:any[]=[];
  constructor(private tempService:TempdemographicsService,private router:Router) { }

  ngOnInit(): void {

this.getTempDemographics();
  }

  getTempDemographics(TempId?:number,  Name?:string,  Address?:string,  PersonEthnicityTypeId?:number,  Mobile?:string,  DOB?:string, Gender?:string,  Country?:number, State?:number,  City?:number,  ZipCode?:string,InsuredId?:number,  CarrierId?:number){

    this.tempService.getTempDemographics(TempId,  Name,  Address,  PersonEthnicityTypeId,  Mobile,  DOB, Gender,  Country, State,  City,  ZipCode,InsuredId,  CarrierId).then((tempdemo) => {

      console.log(tempdemo);

      
    if(tempdemo.table1){
      debugger;
            let temp = [];
      
      for(let i=0 ;i<tempdemo.table1.length;i++){
      
      
    
      
      temp.push({
      
        personFullName:tempdemo.table1[i].personFullName,
        personEmail:tempdemo.table1[i].personEmail,
        patientBirthDate:tempdemo.table1[i].patientBirthDate,
        nationalityName:tempdemo.table1[i].nationalityName,
        countryName:tempdemo.table1[i].countryName,
        personSex:tempdemo.table1[i].personSex,
        tempId:  tempdemo.table1[i].tempId
      
      
      
      });
      
      
      
      
      
      
      
      }
      
        
      
      this.tempObj = temp;
          
          }

    });

  }

  buttonRoute(url:string){
    this.router.navigate([url]);
  }

}
