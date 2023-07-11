import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
url:string="";
  constructor(private permissionsService:NgxPermissionsService,private router:Router) { 

		this.router.events.subscribe((url:any) => {


this.url=url?.route?.path;

    });


    
  }

  checkLoginStatusAndRoute(){

		let cookie = localStorage.getItem("currentUser");
debugger
		if(cookie){
			let user =JSON.parse(localStorage.getItem("currentUser")||""); 
			if(user){
			

  

if(this.url=='/'|| this.url==''){
  this.router.navigate(['/dashboard']);

}

    

			}


		}
    else{
      this.router.navigate(['/login']);

    }


	}

  setPermissions(){
    let perms = 	localStorage.getItem('permissions');
    if(perms){
      this.permissionsService.loadPermissions(JSON.parse(perms));

    }

  }
}
