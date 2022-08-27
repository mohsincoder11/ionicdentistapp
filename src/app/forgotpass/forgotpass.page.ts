import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {
  mobile_no: boolean = false;
  mobile_length: boolean = false;
  loader_visibility: boolean = false;
  mobile_not_register;
  constructor(
    public router: Router,
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService

  ) { }

  ngOnInit() {
  }


  sendotp(formdata: NgForm) {
    formdata.value.mobile.toString().length == 10 ? this.mobile_length = false : this.mobile_length = true;
    if (formdata.value.mobile.toString().length == 10) {
      this.loader_visibility=true;
      this.http
        .post(`${this.url.serverUrl}send_otp_doctor`, formdata.value)
        .subscribe(
          (res) => {
            this.loader_visibility=false;
            if (res == 0) {
              this.toaster.toaster_show('This mobile number is not registered with us.', 'error', 'white');
            }
            else {
              this.router.navigate(['/otpconfirm/' + formdata.value.mobile + '/' + res]);
            }
          },
          (err) => console.log(err)
        );
    }
  }

}
