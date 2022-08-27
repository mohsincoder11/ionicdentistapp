import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core';
declare var $: any;
import { ToasterService } from "../services/toaster/toaster.service";


@Component({
  selector: 'app-timemaster',
  templateUrl: './timemaster.page.html',
  styleUrls: ['./timemaster.page.scss'],
})
export class TimemasterPage implements OnInit {
  myDate: String = new Date().toISOString();
  start_time: boolean = false;
  correct_time: boolean = false;
  end_time: boolean = false;
  duration: boolean = false;
  doctor_id: boolean = false;
  hospital_id: boolean = false;
  doctor_with_hosp;
  time_slot_array;
  //morning
  minTime1 = '06:30';
  maxTime1 = '11:59';
  time_period = "morning";
  doctor_list;
  hospital_list;
  session_data;
  loader_visibility: boolean = true;
  small_loader: boolean = false;

  constructor(
    public http: HttpClient,
    public url: UrlService,
    private storage: Storage,
    public cdr: ChangeDetectorRef,
    public toaster: ToasterService


  ) { }

  ngOnInit() {
  }
  get_doctor_with_appoinment() {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}get_doctor_with_appoinment?role=${this.session_data.role}&id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          this.doctor_with_hosp = res;
          this.loader_visibility = false;
          console.table(res);
        },
        (err) => console.log(err)
      );
  }

  radioGroupChange(event) {
    $(".time_in").val('');
    this.time_period = event.detail.value;
    if (this.time_period == "morning") {
      this.minTime1 = '06:30';
      this.maxTime1 = '11:59';
    }
    if (this.time_period == "afternoon") {
      this.minTime1 = '12:00';
      this.maxTime1 = '16:59';
    }
    if (this.time_period == "evening") {
      this.minTime1 = '17:00';
      this.maxTime1 = '23:00';
    }
  }

  generate_slot(formdata: NgForm) {
    formdata.value.start_time ? this.start_time = false : this.start_time = true;
    formdata.value.end_time ? this.end_time = false : this.end_time = true;
    formdata.value.duration ? this.duration = false : this.duration = true;
    formdata.value.hospital_id ? this.hospital_id = false : this.hospital_id = true;
    formdata.value.doctor_id ? this.doctor_id = false : this.doctor_id = true;
    var startDate = moment(formdata.value.start_time);
    var endDate = moment(formdata.value.end_time);
    var diff = endDate.diff(startDate);
    diff >= 60000 ? this.correct_time = false : this.correct_time = true;

    if (formdata.value.start_time && formdata.value.end_time && formdata.value.duration
      && formdata.value.hospital_id && formdata.value.doctor_id && diff >= 60000) {
      this.loader_visibility = true;

      let start_time = this.convert_to_time(formdata.value.start_time);
      let end_time = this.convert_to_time(formdata.value.end_time);
      var timeStops = this.getTimeStops(start_time, end_time, formdata.value.duration);
      formdata.value.time = timeStops;
      formdata.value.time_period = this.time_period;
      this.http
        .post(`${this.url.serverUrl}add_appointment_setting`, formdata.value)
        .subscribe(
          (res) => {
            //  formdata.resetForm();
            this.get_doctor_with_appoinment();

            this.loader_visibility = false;
            if (res == 0) {
              this.toaster.toaster_show('Time setting already exists.', 'error', 'white');

            }
            else {
              this.toaster.toaster_show('Time setting added successfully.', 'success', 'white');

            }

          },
          (err) => console.log(err)
        );
    }
  }

  getTimeStops(start, end, duration) {
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');
    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    var timeStops = [];
    while (startTime <= endTime) {
      timeStops.push(moment(startTime).format('HH:mm'));
      startTime.add(duration, 'minutes');
    }
    return timeStops;
  }

  convert_to_time(time) {
    let st = time.split('T')[1];
    st = st.toString();
    st = st.substring(0, 5)
    return st;
  }

  ionViewWillEnter() {
    $('.section').removeClass("collapsed");
    $('.downarrow').removeClass("collapsed");
    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
      this.get_doctor();
      this.get_doctor_with_appoinment();

    })
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

  get_hospital_of_doctor(event) {
    this.loader_visibility = true;
    let single_doctor = this.doctor_list.filter(function (e) {
      return e.id == event.detail.value;
    });
    single_doctor = single_doctor[0].hospital_id;
    single_doctor = single_doctor.split(",");
    this.get_hospital(single_doctor);
  }

  get_hospital(id) {
    this.http.get(`${this.url.serverUrl}get_hospital_array?id=${id}`)
      .subscribe(
        (res) => {
          this.hospital_list = res;
          this.loader_visibility = false;
        },
        (err) => console.log(err)
      );
  }

  toggle_div(doctor_id, hospital_id, id) {
    this.small_loader = true;
    $('.section').removeClass("collapsed");
    $('#collapsible' + id).addClass("collapsed");
    $('.downarrow').removeClass("collapsed");
    $('#downarrow' + id).addClass("collapsed");

    this.http.get(`${this.url.serverUrl}get_time_slot_in_time_master?doctor_id=${doctor_id}
    &hospital_id=${hospital_id}`)
      .subscribe(
        (res) => {
          this.time_slot_array = res;
          this.small_loader = false;
        },
        (err) => console.log(err)
      );
  }

  delete_time_slot(doctor_id, hospital_id, time_period) {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}delete_time_slot?doctor_id=${doctor_id}
    &hospital_id=${hospital_id}&time_period=${time_period}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.time_slot_array[time_period] = null;
        },
        (err) => console.log(err)
      );
  }

}
