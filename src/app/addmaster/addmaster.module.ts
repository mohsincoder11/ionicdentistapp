import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmasterPageRoutingModule } from './addmaster-routing.module';

import { AddmasterPage } from './addmaster.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmasterPageRoutingModule
  ],
  declarations: [AddmasterPage]
})
export class AddmasterPageModule {}
