import { Component, ElementRef, OnInit, QueryList, SimpleChange, ViewChild, ViewChildren } from '@angular/core';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { Table } from 'primeng/table';
import {  HrEmployee, Resources, Status } from 'src/app/shared/control-panel/users';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';





@Component({
  selector: 'hr-employee',
  templateUrl: './hr-employee.component.html',
  styleUrls: ['./hr-employee.component.css']
})
export class HrEmployeeListComponent implements OnInit {


  filter:boolean;
    selectedResource: Resources | undefined;

    selectedStatus:Status | undefined;


    resources :Resources[];
    status :Status[];



    
activityValues: number[] = [0, 100];



employees:HrEmployee[];






loading: boolean = true;





@ViewChild('table', {  
    static: false  
}) table: any  ;



@ViewChild('searchTxt', {  
    static: false  
}) searchTxt: any  ;




   position: string;
  constructor(private userService:UsersService,private confirmationService: ConfirmationService,private messageService: MessageService,private router:Router) {



    this.status = [
      {code: 0, name: "[All]"},
        {code: 1, name: "Active"},
        {code: 2, name: "In-Active"},
       
      
     ];

    this.resources = [
        {code: 0, name: "[All]"},
        {code: 2, name: "Employees"},
        {code: 1, name: "Refering Providers"}
       
     ];

     this.selectedStatus = this.status.find(a=>a.code==0);

     this.selectedResource = this.resources.find(a=>a.code==0);



   }
 



 
  ngOnInit() {


this.loadEmployees();



  

  
}



buttonRoute(url:string){
  this.router.navigate([url]);
}
getFiltersquery(){

  let query='';
debugger

  if(this.selectedStatus?.code!=0){

let isActive = this.selectedStatus?.code == 1?true:false;
    query=`?Active=${isActive}`;

    if(this.selectedResource?.code!=0){

      if(this.selectedResource?.code==2)
{
  query+=`&IsEmployee=true`;

}
else{
  query+=`&isRefProvider=true`;

}


return query;
    }
  }



  if(this.selectedResource?.code!=0){

    let isActive = this.selectedStatus?.code == 1?true:false;

    if(this.selectedResource?.code==2)
{
  query+=`?IsEmployee=true`;

}
else{
  query+=`?isRefProvider=true`;

}
    if(this.selectedStatus?.code!=0){
      query+=`&Active=${isActive}`;

    }
  }

  return query;







}

loadEmployees(){

  
  this.userService.getHrEmployees(this.getFiltersquery()).then((employees) => {
    debugger
    this.employees = employees.table2;
    this.loading = false;

   // this.customers.forEach((customer) => (customer.date = new Date(customer.date?.toLocaleString)));
}).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));


}


OnChangeSearchByStatus(event:any){


  this.loadEmployees();
}
OnChangeSearchByType(event:any){
  this.loadEmployees();



}



 handleSearchEvent(event:Event) {

    debugger;
let query = (event.target as HTMLTextAreaElement).value;
    this.table.filterGlobal(query, 'contains');



    console.log(query);
  }

clear(table: Table) {
    table.clear();
    this.selectedStatus = this.status.find(a=>a.code==0);

    this.selectedResource = this.resources.find(a=>a.code==0);
this.loadEmployees();

}

Remove(Id:number){
  this.userService.removeEmployees(Id).then((response)=>{
if(response.success){


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted' });
  this.loadEmployees();
}


}).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

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





ClickFilter(){

  this.filter=true;
}



}







