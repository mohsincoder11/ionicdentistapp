import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmappointmentPageRoutingModule } from './confirmappointment-routing.module';

import { ConfirmappointmentPage } from './confirmappointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmappointmentPageRoutingModule
  ],
  declarations: [ConfirmappointmentPage]
})
export class ConfirmappointmentPageModule {}
