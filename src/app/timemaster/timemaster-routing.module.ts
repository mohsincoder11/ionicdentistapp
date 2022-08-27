import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimemasterPage } from './timemaster.page';

const routes: Routes = [
  {
    path: '',
    component: TimemasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimemasterPageRoutingModule {}
