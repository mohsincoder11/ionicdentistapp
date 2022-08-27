import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Router } from '@angular/router';
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-confirmpassword',
  templateUrl: './confirmpassword.page.html',
  styleUrls: ['./confirmpassword.page.scss'],
})
export class ConfirmpasswordPage implements OnInit {
  password: boolean = false;
  password2: boolean = false;
  password_match: boolean = false;
  loader_visibility:boolean=false;
  mobile='7385078839';
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public router:Router,
    public toaster: ToasterService

  ) { }

  ngOnInit() {
  }

  setpassword(formdata: NgForm) {
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.password2 ? this.password2 = false : this.password2 = true;
    formdata.value.mobile=this.mobile;
    if (formdata.value.password == formdata.value.password2) {
      this.http
        .post(`${this.url.serverUrl}update_dotor_password`, formdata.value)
        .subscribe(
          (res) => {
            if (res) {
              this.toaster.toaster_show('Password updated successfully.', 'success', 'white');

            }
            formdata.resetForm();

          },
          (err) => console.log(err)
        );
    }
    else {
      this.password_match = true;
    }
    console.log(formdata.value);
  }

}
