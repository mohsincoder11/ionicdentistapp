import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DatePipe,CommonModule } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
     IonicModule.forRoot(),
    HttpClientModule,
     AppRoutingModule,
     IonicStorageModule.forRoot(),
     NgxIonicImageViewerModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule {}
