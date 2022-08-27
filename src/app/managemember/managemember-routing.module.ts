import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagememberPage } from './managemember.page';

const routes: Routes = [
  {
    path: '',
    component: ManagememberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagememberPageRoutingModule {}
