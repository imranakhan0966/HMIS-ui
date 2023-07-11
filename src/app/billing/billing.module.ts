import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { FrontdeskcollectionComponent } from './frontdeskcollection/frontdeskcollection.component';


@NgModule({
  declarations: [
    FrontdeskcollectionComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
