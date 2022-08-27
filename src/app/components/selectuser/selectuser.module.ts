import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectuserPageRoutingModule } from './selectuser-routing.module';
import { SelectuserPage } from './selectuser.page';
import { PipesModule } from '../../pipe/truncaterating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectuserPageRoutingModule,
    PipesModule
  ],
  declarations: [SelectuserPage]
})
export class SelectuserPageModule { }
