import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpconfirmPageRoutingModule } from './otpconfirm-routing.module';

import { OtpconfirmPage } from './otpconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpconfirmPageRoutingModule
  ],
  declarations: [OtpconfirmPage]
})
export class OtpconfirmPageModule {}
