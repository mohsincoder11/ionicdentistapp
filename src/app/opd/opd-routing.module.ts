import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpdPage } from './opd.page';

const routes: Routes = [
  {
    path: '',
    component: OpdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpdPageRoutingModule {}
