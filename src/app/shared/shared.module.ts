import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AsideComponent } from '../aside/aside.component';

@NgModule({
  declarations: [
    SharedComponent,
    TitleBarComponent,
    
    
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    SharedRoutingModule,
    InputTextModule,
    FormsModule, 
    ReactiveFormsModule,
        NgxPermissionsModule,


  ],
  exports: []
})
export class SharedModule { }
