import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { DemographicsComponent } from './demographics/demographics.component';
import { CoveragesComponent } from './coverages/coverages.component';
import { TemporarydemographicsComponent } from './temporarydemographics/temporarydemographics.component';
import { DemographicsListComponent } from './demographics/demographics-list/demographics-list.component';
import { TempdemographicsListComponent } from './temporarydemographics/tempdemographics-list/tempdemographics-list.component';
import { AddnewsubscriberComponent } from './coverages/addnewsubscriber/addnewsubscriber.component';

export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
  return ['Registration'];

}
const routes: Routes = [

  { 
    
    path: 'demographics/create',component:DemographicsComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },

  
  { 
    
    path: 'demographics/list',component:DemographicsListComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },
  
  { 
    
    path: 'coverages',component:CoveragesComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },

  {
    path: 'coverages/addnewsubscriber',
    component: AddnewsubscriberComponent,
    data: {
      permissions: {
        only: testPermissions,
        redirectTo: '/dashboard'
      } as NgxPermissionsRouterData
    }
  },
   
  { 
    
    path: 'temporarydemographics/create',component:TemporarydemographicsComponent ,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  },

  { 
    
    path: 'temporarydemographics/list',component:TempdemographicsListComponent ,  canActivate: [NgxPermissionsGuard],
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
export class RegistrationRoutingModule { }
