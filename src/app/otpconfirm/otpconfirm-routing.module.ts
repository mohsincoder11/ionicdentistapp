import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpconfirmPage } from './otpconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: OtpconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpconfirmPageRoutingModule {}
