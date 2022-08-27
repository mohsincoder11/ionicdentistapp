import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmpasswordPage } from './confirmpassword.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmpasswordPageRoutingModule {}
