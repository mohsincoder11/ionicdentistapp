import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-managemember',
  templateUrl: './managemember.page.html',
  styleUrls: ['./managemember.page.scss'],
})
export class ManagememberPage implements OnInit {

  gendervalue = 'Male';
  session_data;
  patient_member_list;
  f_name: boolean = false;
  l_name: boolean = false;
  gender: boolean = false;
  dob: boolean = false;
  mobile: boolean = false;
  password: boolean = false;
  loader_visibility: boolean = false;
  today_date;
  currentDate;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public router: Router,
    public datepipe: DatePipe,
    public toaster: ToasterService

  ) {

  }

  radioGroupChange(event) {
    this.gendervalue = event.detail.value;
  }
  add_member(formdata: NgForm) {
    formdata.value.gender = this.gendervalue;
    formdata.value.parent_id = this.session_data.id;
    formdata.value.created_by = 'admin';
    formdata.value.dob ? this.dob = false : this.dob = true;
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.mobile ? this.mobile = false : this.mobile = true;
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    if (formdata.value.f_name && formdata.value.l_name && formdata.value.dob && formdata.value.mobile && formdata.value.password) {
      this.loader_visibility = true;
      formdata.value.dob = formdata.value.dob.split('T')[0];
      this.http
        .post(`${this.url.serverUrl}add_patient_member`, formdata.value)
        .subscribe(
          (res) => {
            if (res) {
              this.loader_visibility = false;
              this.toaster.toaster_show('Member Added Successfully.', 'success', 'white');


            }
            formdata.resetForm();
            this.router.navigate(['/doctorlist']);

          },
          (err) => console.log(err)
        );
    }


  }

  ionViewDidEnter() {
    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
    })
    this.today_date = new Date();
    this.currentDate = this.datepipe.transform(this.today_date, 'YYYY-MM-dd');

  }
  ngOnInit() {
  }


}
