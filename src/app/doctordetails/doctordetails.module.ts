import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctordetailsPageRoutingModule } from './doctordetails-routing.module';

import { DoctordetailsPage } from './doctordetails.page';
import { CalendarModule } from 'ion2-calendar';
import { PipesModule } from '../pipe/truncaterating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctordetailsPageRoutingModule,
    CalendarModule,
    PipesModule
  ],
  declarations: [DoctordetailsPage]
})
export class DoctordetailsPageModule {}
