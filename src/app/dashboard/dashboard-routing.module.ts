import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';



export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
  return ['Control Panel'];

}
const routes: Routes = [

{
  path: '',component: HomeComponent,  canActivate: [NgxPermissionsGuard],
  data: {
    permissions: {
      only: testPermissions,
      redirectTo: '/'
    } as NgxPermissionsRouterData
  }
}
  

// { path: '',component: HomeComponent}


];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
