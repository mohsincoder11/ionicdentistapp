import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmpasswordPageRoutingModule } from './confirmpassword-routing.module';

import { ConfirmpasswordPage } from './confirmpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmpasswordPageRoutingModule
  ],
  declarations: [ConfirmpasswordPage]
})
export class ConfirmpasswordPageModule {}
