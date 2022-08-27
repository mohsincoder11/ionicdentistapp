import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimemasterPageRoutingModule } from './timemaster-routing.module';

import { TimemasterPage } from './timemaster.page';
import {Moment} from 'moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimemasterPageRoutingModule,
    
  ],
  declarations: [TimemasterPage]
})
export class TimemasterPageModule {}
