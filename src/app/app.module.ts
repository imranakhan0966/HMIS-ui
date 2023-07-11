import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TitleComponent } from './title/title.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {SplitButtonModule} from 'primeng/splitbutton';
import { AgmCoreModule } from '@agm/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './public/login/login.component';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AsideComponent } from './aside/aside.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RegistrationModule } from './registration/registration.module';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    LoginComponent,
    AsideComponent     
  ],
  
  imports: [
    SidebarModule,HttpClientModule,HttpModule,SplitButtonModule,
    ButtonModule,ToastModule,CheckboxModule,
    BrowserModule,

    AppRoutingModule,BrowserAnimationsModule,
    
    FormsModule, 
    ReactiveFormsModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDc1_3IcGdUfouLTJg5rjlKoZYSy0CEMLE'
    }),
    DashboardModule,
    ControlPanelModule,
    SharedModule,
    ProgressSpinnerModule,
    RegistrationModule,
    
  // Specify your library as an import
  NgxPermissionsModule.forRoot()
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
