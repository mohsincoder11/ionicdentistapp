import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddleavePage } from './addleave.page';

const routes: Routes = [
  {
    path: '',
    component: AddleavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddleavePageRoutingModule {}
