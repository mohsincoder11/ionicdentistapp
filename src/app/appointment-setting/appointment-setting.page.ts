import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Storage } from '@ionic/storage';
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-appointment-setting',
  templateUrl: './appointment-setting.page.html',
  styleUrls: ['./appointment-setting.page.scss'],
})

export class AppointmentSettingPage implements OnInit {
  total_month_days;
  month_name;
  current_year;
  day_name;
  doctor_list;
  hospital_list;
  session_data;
  loader_visibility: boolean = true;
  doctor_id2;
  time_slot_array;
  hospital_id2;
  doctor_id: boolean = false;
  hospital_id: boolean = false;;
  is_admin = false;
  active_time_array: any = [];
  days = [{ id: 1, day: 'Sunday' }, { id: 2, day: 'Monday' }, { id: 3, day: 'Tuesday' }, { id: 4, day: 'Wednesday' },
  { id: 5, day: 'Thursday' }, { id: 6, day: 'Friday' }, { id: 7, day: 'Saturday' }];

  constructor(
    public http: HttpClient,
    public url: UrlService,
    private storage: Storage,
    public toaster: ToasterService

  ) {
  }

  ionViewDidEnter() {
    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
      this.session_data.role == "admin" ? this.is_admin = true : this.is_admin = false;
      console.log(res);
      this.get_doctor();
    })
  }


  ngOnInit() {
  }

  active_Day(day) {
    this.doctor_id2 ? this.doctor_id = false : this.doctor_id = true;
    this.hospital_id2 ? this.hospital_id = false : this.hospital_id = true;
    if (this.doctor_id2 && this.hospital_id2) {
      this.loader_visibility = true;
      this.days.forEach((value) => {
        document.querySelector('#' + value.day).classList.remove('active');
      });
      document.querySelector('#' + day).classList.add('active');
      
      this.http.get(`${this.url.serverUrl}get_time_slot_of_day?doctor_id=${this.doctor_id2}
      &hospital_id=${this.hospital_id2}&day=${day}`)
        .subscribe(
          (res) => {
            this.time_slot_array = res;
            this.loader_visibility = false;
          },
          (err) => console.log(err)
        );
    }
  }

  active_time(time) {
    this.active_time_array.indexOf(time) === -1 && this.active_time_array.push(time);
    document.querySelector('#time' + time).classList.toggle('active');
  }

  update_appointment_setting() {
    if (this.active_time_array.length > 0) {
      this.loader_visibility = true;
      this.http.get(`${this.url.serverUrl}update_appointment_setting?active_time_array=${this.active_time_array}`)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            this.active_time_array = [];
            this.toaster.toaster_show('Setting updated successfully.', 'success', 'white');

          },
          (err) => console.log(err)
        );
    }

  }

  //getall doctor
  get_doctor() {
    this.http.get(`${this.url.serverUrl}get_doctor?role=${this.session_data.role}&id=${this.session_data.id}
    &parent_id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          console.log(res);
          this.doctor_list = res;
          this.loader_visibility = false;
        },
        (err) => console.log(err)
      );
  }

  //on doctorselect change it will get doctorrow from existing array
  get_hospital_of_doctor(event) {
    this.doctor_id2 = event.detail.value;
    this.loader_visibility = true;
    let single_doctor = this.doctor_list.filter(function (e) {
      return e.id == event.detail.value;
    });
    single_doctor = single_doctor[0].hospital_id;
    single_doctor = single_doctor.split(",");
    this.get_hospital(single_doctor);//hospital id of specific doctor to get all hospital related to him.
  }

  //get all hospital for doctor
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

  send_hospital_id(event) {
    this.hospital_id2 = event.detail.value;
  }
}
