import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientHistoryPageRoutingModule } from './patient-history-routing.module';

import { PatientHistoryPage } from './patient-history.page';
import { PipesModule } from '../pipe/truncaterating.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientHistoryPageRoutingModule,
    PipesModule,
    NgxIonicImageViewerModule
  ],
  declarations: [PatientHistoryPage]
})
export class PatientHistoryPageModule {}
