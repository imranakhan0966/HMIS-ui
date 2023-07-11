import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PermissionService } from '../services/permission.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from '../services/common/api.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { SidenavbarService } from '../services/common/sidenavbar.service';
import { EnvironmentService } from '../services/common/environment.service';


@Component({
	selector: 'app-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
	visibleSidebar1 = false;
	items: MenuItem[]=[];
	loggedIn:boolean=false;
	constructor( private environmentService:EnvironmentService, private sidebarService: SidenavbarService, private permissionsService: NgxPermissionsService,private api: ApiService,public permission: PermissionService,private router: Router) { 

   

	}
	currentUser:any;
	ngOnInit(): void {

	debugger

		this.environmentService.checkLoginStatusAndRoute();
		this.environmentService.setPermissions();
    this.sidebarService.toggleSidebarVisibility(true);
	this.loggedIn=true;
		
		// this.permission.getAssignedPermission();
		this.loggedIn=true;
		this.currentUser =JSON.parse(localStorage.getItem("currentUser")||""); 
		this.items = [

			//replace icon with avatar
            {label: "Log Out", icon: 'pi pi-arrow-circle-right', command: () => {

                this.logout();
            }},
        ];



	
	}

	
	logout() {
		

		this.api.LogOut().subscribe(a=>{
			if(a.success){
				this.permissionsService.flushPermissions();
				localStorage.clear();
				this.toggleSidebar(false);
				this.router.navigate([""]);
			}				
		

		});
	
	}
	openAside=true;
	closeSidebar() {
		const sidebarMargin = window.document.getElementById("sidebar") as HTMLInputElement;
		sidebarMargin.style.width = "0px";
		this.closeAside=true;
		this.openAside=false;		
	}
	closeAside=false;
	openSidebar() {
		const sidebarMargin = window.document.getElementById("sidebar") as HTMLInputElement;
		sidebarMargin.style.width = "230px";
		this.openAside=true;
		this.closeAside=false;
	}


	checkPermissions(permissions:any){

	let haspermission =  this.permissionsService.hasPermission(permissions).then(response=>{

		return response;
	});

	
	
	}



	toggleSidebar(visible:boolean) {
		this.sidebarService.toggleSidebarVisibility(visible);
	}



}
