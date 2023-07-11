import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { HrEmployeeCreateComponent } from './users/hr-employee-create/hr-employee-create.component';
import { HrEmployeeEditComponent } from './users/hr-employee-edit/hr-employee-edit.component';
import { HrEmployeeLicenseEditComponent } from './users/hr-employee-license-edit/hr-employee-license-edit.component';
import { HrEmployeeListComponent } from './users/hr-employee.component';
import { RolesComponent } from './users/roles/roles.component';
import { HrScheduleCreateComponent } from './hr-schedule/hr-schedule-create/hr-schedule-create.component';
import { HrScheduleListComponent } from './hr-schedule/hr-schedule-list/hr-schedule-list.component';
import {EligibilityLogsComponent}from './eligibility-logs/eligibility-logs.component'
import {EligibilityVerificationComponent} from './eligibility-verification/eligibility-verification.component';


export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
      return ['Control Panel'];
 
}
const routes: Routes = [
  { 
    
    path: 'eligibility-logs/list',component: EligibilityVerificationComponent,canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  
  },
  { 
    
    path: 'eligibility-verification/list',component: EligibilityVerificationComponent,canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  
  },
  { 
    
    path: 'hr-schedule/list',component: HrScheduleListComponent,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  
  },


  { 
    
    path: 'hr-schedule/create',component: HrScheduleCreateComponent,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  
  },

  { 
    
    path: 'users/role',component: RolesComponent,
  data: {
    permissions: {
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  

  

},
  { 
    
    path: 'users/list',component: HrEmployeeListComponent,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/dashboard'
    } as NgxPermissionsRouterData
  }
  

  

},

{ 
    
  path: 'users/create',component:HrEmployeeCreateComponent ,  canActivate: [NgxPermissionsGuard],
data: {
  permissions: {
    only: testPermissions,
    redirectTo: '/dashboard'
  } as NgxPermissionsRouterData
}




},
{ 
    
  path: 'users/edit',component: HrEmployeeEditComponent,  canActivate: [NgxPermissionsGuard],
data: {
  permissions: {
    only: testPermissions,
    redirectTo: '/dashboard'
  } as NgxPermissionsRouterData
}




},

{ 
    
  path: 'license/edit',component: HrEmployeeLicenseEditComponent,  canActivate: [NgxPermissionsGuard],
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
export class ControlPanelRoutingModule { }
