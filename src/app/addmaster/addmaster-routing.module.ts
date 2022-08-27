import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmasterPage } from './addmaster.page';

const routes: Routes = [
  {
    path: '',
    component: AddmasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmasterPageRoutingModule {}
