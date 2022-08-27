import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorlistPageRoutingModule } from './doctorlist-routing.module';

import { DoctorlistPage } from './doctorlist.page';
import { FooterPageModule } from '../footer/footer.module';
import { PipesModule } from '../pipe/truncaterating.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorlistPageRoutingModule,
    FooterPageModule,
    PipesModule,
    Ng2SearchPipeModule
  ],
  declarations: [DoctorlistPage]
})
export class DoctorlistPageModule {}
