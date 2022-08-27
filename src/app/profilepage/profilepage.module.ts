import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilepagePageRoutingModule } from './profilepage-routing.module';

import { ProfilepagePage } from './profilepage.page';
import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilepagePageRoutingModule,
    FooterPageModule,
    
  ],
  declarations: [ProfilepagePage]
})
export class ProfilepagePageModule {}
