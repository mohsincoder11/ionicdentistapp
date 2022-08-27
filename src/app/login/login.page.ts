import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public mobile: boolean = false;
  public password: boolean = false;
  loader_visibility: boolean = false;
  session_data;
  constructor(
    private _location: Location,
    private platform: Platform,
    public alertController: AlertController,
    public url: UrlService,
    public http: HttpClient,
    private storage: Storage,
    private router: Router,
    public toaster: ToasterService


  ) { }

  ngOnInit() {
  }

  login(formdata: NgForm) {
    formdata.value.mobile ? this.mobile = false : this.mobile = true;
    formdata.value.password ? this.password = false : this.password = true;
    if (formdata.value.mobile && formdata.value.password) {
      this.loader_visibility = true;

      this.http
        .post(`${this.url.serverUrl}check_login_doctor`, formdata.value)
        .subscribe(
          (res) => {
            console.log(res);
            if (res == 0) {
              this.loader_visibility = false;
              this.toaster.toaster_show('Invalid username or password.', 'error', 'white');

            }
            else {
              this.session_data = res;
              this.storage.set('login_details_doctor', this.session_data).then(res => {
                this.router.navigate(['/dashboard']);
              })
            }
          },
          (err) => {
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');

          }
        );
    }
  }

  ionViewDidEnter() {
    this.loader_visibility = false;

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/login')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();

      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();

      }
    });
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }
  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
}
