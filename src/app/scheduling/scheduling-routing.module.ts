import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { CoveragesComponent } from '../registration/coverages/coverages.component';

import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment/appointment-edit/appointment-edit.component';
import { AppointmentbookingComponent } from './appointmentbooking/appointmentbooking.component';
import { ViewappointmentComponent } from './viewappointment/viewappointment.component';

import { AppointmenthistoryComponent } from './appointmenthistory/appointmenthistory.component';


export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
	return ['Scheduling'];
  
  }


const routes: Routes = [


  { 
    
    path: 'appointment/dashboard',component:ViewappointmentComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },
  
  { 
    
    path: 'appointment/list',component:AppointmentListComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },


  { 
    
    path: 'appointment/create',component:AppointmentbookingComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },


  { 
    
    path: 'appointment/edit',component:AppointmentEditComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },

  { 
    
    path: 'appointment/history',component:AppointmenthistoryComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  }

 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingRoutingModule { }
