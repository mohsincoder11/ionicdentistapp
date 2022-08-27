import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllpatientPage } from './allpatient.page';

const routes: Routes = [
  {
    path: '',
    component: AllpatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllpatientPageRoutingModule {}
