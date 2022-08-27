import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public router: Router,
    private storage: Storage

  ) {
    if (!navigator.onLine) {
      console.log('no connection');
    }
    else {
      console.log('connection');

    }
    this.initializeApp();
  }

  
  initializeApp() {
    this.storage.create();
    this.platform.ready().then(() => {
      this.router.navigateByUrl('/');
    });
  }




}
