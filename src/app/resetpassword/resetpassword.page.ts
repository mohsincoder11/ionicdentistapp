import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  mobile_number;
  fill_all;
  both_same;
  loader_visibility: boolean = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService


  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.mobile_number = this.route.snapshot.paramMap.get('number');
    console.log(this.mobile_number);
  }

  update_password(formdata: NgForm) {
    formdata.value.password1 && formdata.value.password2 ? this.fill_all = false : this.fill_all = true;
    formdata.value.password1 == formdata.value.password2 ? this.both_same = false : this.both_same = true;
    if (formdata.value.password1 && formdata.value.password2 && formdata.value.password1 == formdata.value.password2) {
      this.loader_visibility = true;

      formdata.value.mobile = this.mobile_number;
      this.http
        .post(`${this.url.serverUrl}update_doctor_password`, formdata.value)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Password updated successfully.', 'success', 'white');

            console.log(res);
           this.router.navigate(['/login']);

          },
          (err) => console.log(err)
        );
    }

  }
}
