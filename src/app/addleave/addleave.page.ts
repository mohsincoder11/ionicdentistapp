import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
declare var $: any;
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-addleave',
  templateUrl: './addleave.page.html',
  styleUrls: ['./addleave.page.scss'],
})
export class AddleavePage implements OnInit {
  date: string;
  type: 'string';
  reason = false;
  doctor_id = false;
  date2 = false;
  doctor_list;
  leave_days;
  loader_visibility: boolean = true;
  session_data;
  doctor_id2;
  appointment_count;
  leave_data;
  is_admin: boolean = false;
  constructor(
    public http: HttpClient,
    public url: UrlService,
    public storage: Storage,
    public toaster: ToasterService

  ) { }

  ngOnInit() {


  }

  ionViewDidEnter() {
    this.loader_visibility = true;

    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
      res.role == 'admin' ? this.is_admin = true : this.is_admin = false;
      this.get_leave();
      this.get_doctor();
    })
  }

  add_leave(formdata: NgForm) {
    formdata.value.reason ? this.reason = false : this.reason = true;
    formdata.value.date ? this.date2 = false : this.date2 = true;
    this.is_admin ? formdata.value.doctor_id = formdata.value.doctor_id : formdata.value.doctor_id = this.session_data.id;
    formdata.value.doctor_id ? this.doctor_id = false : this.doctor_id = true;

    if (formdata.value.reason && formdata.value.date && formdata.value.doctor_id) {
      this.loader_visibility = true;
      formdata.value.date = moment(formdata.value.date._d);
      formdata.value.date = formdata.value.date.format('YYYY-MM-DD');
      this.leave_data = formdata.value;
      this.http
        .post(`${this.url.serverUrl}add_leave`, formdata.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.loader_visibility = false;

            if (res[0]['error']) {
              this.appointment_count = res[0]['count'];
              $("#confirm_add_leave_modal").removeClass("hide");
              $("#confirm_add_leave_modal").addClass("show");

            }
            else {
              this.toaster.toaster_show('Leave added successfully.', 'success', 'white');
              formdata.resetForm();
              this.get_leave();
            }
          },
          (err) => console.log(err)
        );
    }
  }

  delete_leave(id) {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}delete_leave?id=${id}`)
      .subscribe(
        (res) => {
          this.toaster.toaster_show('Leave deleted successfully.', 'error', 'white');

          this.get_leave();
        },
        (err) => console.log(err)
      );
  }


  get_leave() {
    this.http.get(`${this.url.serverUrl}get_leave?role=${this.session_data.role}&id=${this.session_data.id}&parent_id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          this.leave_days = res;
          this.loader_visibility = false;
        },
        (err) => console.log(err)
      );
  }

  get_doctor() {
    this.http.get(`${this.url.serverUrl}get_doctor?role=${this.session_data.role}&id=${this.session_data.id}&parent_id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          this.doctor_list = res;
          this.loader_visibility = false;
        },
        (err) => console.log(err)
      );
  }

  close_modal(id) {
    $("#" + id).removeClass("show");
    $("#" + id).addClass("hide");

  }
  confirm_add_leave() {
    console.log(this.leave_data);
    this.http
    .post(`${this.url.serverUrl}confirm_add_leave`, this.leave_data)
    .subscribe(
      (res) => {
        $("leaveform").trigger("reset");
        this.get_leave();
        this.close_modal('confirm_add_leave_modal');
      }
    )
  }
}
