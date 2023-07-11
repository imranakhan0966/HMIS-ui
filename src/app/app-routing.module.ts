import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { LoginComponent } from './public/login/login.component';



const routes: Routes = [



{path:'login',component:LoginComponent},


{ path: 'control-panel', loadChildren: () => import('./control-panel/control-panel.module').then(m => m.ControlPanelModule) },

{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

	{ path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
	{ path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },

	{ path: 'scheduling', loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule) },

	{ path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },


]

@NgModule({
	imports: [RouterModule.forRoot(routes,{enableTracing: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
