import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/common/api.service';
import { ValidationService } from '../../services/validation.service';
import {SidenavbarService} from '../../services/common/sidenavbar.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoaderService } from 'src/app/services/common/loader.service';
import { EnvironmentService } from 'src/app/services/common/environment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  admin:any = {};

	title = 'HMIS';
	active = true;
	loaderActive:boolean=false;

  constructor(private loaderService:LoaderService,private environmentService:EnvironmentService, private sidebarService: SidenavbarService, private permissionsService: NgxPermissionsService,private api: ApiService, private messageService: MessageService,private valid: ValidationService, private router: Router) { 



  }

  ngOnInit(): void {



	

  }


  
  toggleSidebar(visible:boolean) {
	this.sidebarService.toggleSidebarVisibility(visible);
}
  loginAction() {
		if(this.valid.Validation(this.admin.Name)){
			this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please Enter User Name" });	
			return;
		}
		if(this.valid.Validation(this.admin.Password)){
			this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please Enter Password" });	
			return;
		}
		this.api.Login(this.admin).subscribe(res => {
			if(res.success){
let response = JSON.parse(JSON.stringify(res));
let allowscreens = response.allowscreens;
let token = response.token;
let username = response.userId;
let cookieObj = {token:token,userId:username};


console.log(allowscreens);

this.LoadPermissions(allowscreens);

				localStorage.setItem("currentUser", JSON.stringify(cookieObj));
				this.messageService.add({ severity: 'success', summary: 'Successfully logged in', detail: '' });
				this.toggleSidebar(true);
				this.active=false;
				this.router.navigate(['/dashboard']);

			}
			else{
				this.messageService.add({ severity: 'error', summary: 'Error', detail: res })
				this.loaderService.toggleLoaderVisibility(false);
			}
		
		}, err => {
			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error has occured, Please retry later' })
			this.loaderService.toggleLoaderVisibility(false);

		})
	}







	LoadPermissions(perms:any[]){

		//let permissions = [];
		

		if(!perms){
			this.permissionsService.flushPermissions();
			return;
		}
		console.log(perms);


    localStorage.setItem('permissions', JSON.stringify(perms));

		this.permissionsService.loadPermissions(perms);
	




	}

}
