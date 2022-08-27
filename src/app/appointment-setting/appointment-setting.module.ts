import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentSettingPageRoutingModule } from './appointment-setting-routing.module';

import { AppointmentSettingPage } from './appointment-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentSettingPageRoutingModule,
    
  ],
  declarations: [AppointmentSettingPage]
})
export class AppointmentSettingPageModule {}
