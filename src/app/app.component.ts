import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/common/loader.service';
import { SidenavbarService } from './services/common/sidenavbar.service';
import { EnvironmentService } from './services/common/environment.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	admin:any = {};
public loggedIn:boolean=false;
	title = 'HMIS';
	active = false;
	signup = false;
	sidebarActive:boolean=false;
	loaderActive:boolean=false;
	constructor( private environmentService:EnvironmentService,private sidebarService: SidenavbarService, private loaderService:LoaderService,private router: Router) {



	 }
	async ngOnDestroy()
	{
		
	
	}



	ngOnInit(): void {



		

		this.environmentService.checkLoginStatusAndRoute();
		this.environmentService.setPermissions();
    this.sidebarService.toggleSidebarVisibility(true); // this.environmentService.checkLoginStatusAndRoute();
	

		this.sidebarService.sidebarVisibilityChange.subscribe(value => {

			this.sidebarActive= value;
			
				});


				this.loaderService.loaderVisibilityChange.subscribe(value => {

			console.log(value);
					this.loaderActive= value;
					
						});
	}


	showLayout(){
	
	let user =JSON.parse(localStorage.getItem("currentUser")||""); 
	if(user){
		if(this.router.url !== '/login' && this.router.url !== '')
		return true;
	
	
	}
	return false;

	}

	

}