import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentSettingPage } from './appointment-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentSettingPageRoutingModule {}
