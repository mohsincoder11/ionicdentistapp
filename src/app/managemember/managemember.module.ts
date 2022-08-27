import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagememberPageRoutingModule } from './managemember-routing.module';

import { ManagememberPage } from './managemember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagememberPageRoutingModule
  ],
  declarations: [ManagememberPage]
})
export class ManagememberPageModule {}
