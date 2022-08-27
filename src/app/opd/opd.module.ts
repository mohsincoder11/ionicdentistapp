import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OpdPageRoutingModule } from './opd-routing.module';
import { OpdPage } from './opd.page';
import { FooterPageModule } from '../footer/footer.module';
import { PipesModule } from '../pipe/truncaterating.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    OpdPageRoutingModule,
    FooterPageModule,
    PipesModule
  ],
  declarations: [OpdPage]
})
export class OpdPageModule {}
