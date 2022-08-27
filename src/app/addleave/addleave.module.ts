import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddleavePageRoutingModule } from './addleave-routing.module';

import { AddleavePage } from './addleave.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddleavePageRoutingModule,
    CalendarModule
  ],
  declarations: [AddleavePage]
})
export class AddleavePageModule {}
