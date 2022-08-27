import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { UrlService } from '../url/url.service';
import { ToasterService } from '../toaster/toaster.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loading;
  session_data;
  constructor(
    public router: Router,
    public LoadingController: LoadingController,
    public http: HttpClient,
    public server_url: UrlService,
    public toast: ToasterService,
    public storage: Storage
  )  { }

  async check_login(formdata) {
    //  await this.LoadingController.create({
    //   message: 'Please Wait...',
    //   spinner: 'lines-small',

    //   cssClass: 'custom-class custom-loading',
    // }).then((overlay) => {
    //   this.loading = overlay;
    //   this.loading.present();
    // })

    if (formdata.value.username == 'admin' && formdata.value.password == '1234') {

     this.session_data=[{username:'admin',password:'1234'}];
    // this.loading.dismiss();
      this.storage.set('login_details', this.session_data).then(res => {
        this.router.navigate(['/dashboard']);
      })
    }
    else {
     // this.loading.dismiss();

      this.toast.Toast('Check Username or Password.', 'danger', 1500);

    }
    // this.http.get(`${this.server_url.server_url}login_api?username=${formdata.value.username}&password=${formdata.value.password}`).subscribe(data=>{
    //   this.loading.dismiss();    
    //   if(data==0)
    //   {
    //     this.toast.Toast('Check Username or Password.','danger',200);
    //   }
    //   else{
    //     this.storage.set('login_details',data).then(res=>{
    //     this.router.navigate(['home']);
    //     })
    //   }
    // }, err => {
    //   console.log(err)
    //   })

  }
}
