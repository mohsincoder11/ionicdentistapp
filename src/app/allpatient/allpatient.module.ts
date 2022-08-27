import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllpatientPageRoutingModule } from './allpatient-routing.module';

import { AllpatientPage } from './allpatient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllpatientPageRoutingModule
  ],
  declarations: [AllpatientPage]
})
export class AllpatientPageModule {}
