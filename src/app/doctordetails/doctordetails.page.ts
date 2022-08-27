import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import * as moment from 'moment';
declare var $: any;
import { ModalController } from "@ionic/angular";
import { SelectuserPage } from "./../components/selectuser/selectuser.page";

@Component({
  selector: 'app-doctordetails',
  templateUrl: './doctordetails.page.html',
  styleUrls: ['./doctordetails.page.scss'],
})
export class DoctordetailsPage implements OnInit {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  time = ['11:00 AM', '11:30 Am', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM']
  loader_visibility = false;
  time_slot_array;
  hospital_list;
  date: string;
  type: 'string';
  appointment_date;
  appointment_day;
  appointment_date_error: boolean = false;
  doctor_on_leave: boolean = false;
  select_time_error: boolean = false;
  hospital_id;
  select_hospital;

  selected_time;
  selected_time_slot_id; 
   doctor_data: any = {
    id: "",
    f_name: "",
    l_name: "",
    specialization: "",
    image: "",
    total_rating: "",
    patient_count: "",
    total_appointment: ""
  };
  no_slot_morning: boolean = false;
  no_slot_afternoon: boolean = false;
  no_slot_evening: boolean = false;
  current_time;
  passtime_not_allow: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public router: Router,
    public modal: ModalController
  ) { }

  ngOnInit(): void {

  }
  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.get_single_doctor(id);
  }

  active_time(id, time) {
   
    this.selected_time_slot_id = id;
    this.selected_time = time;   
     $('.time_label').removeClass('active');
    let current_time = moment().format('YYYY-MM-DD H:mm');
    let select_time = moment().format(this.appointment_date + time);
    let current_time2 = moment(current_time, 'YYYY-MM-DD HH:mm');
    let select_time2 = moment(select_time, 'YYYY-MM-DD HH:mm');
    let diff = select_time2.unix() - current_time2.unix();
    if (diff < 0) {
      console.log('cant select past time');
      this.passtime_not_allow = true;
    }
    else {
      $('#time' + id).addClass('active');
      this.passtime_not_allow = false;
    }

  }

  get_single_doctor(id) {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}get_single_doctor?id=${id}`)
      .subscribe(
        (res: any) => {
          // console.log(res[0].total_appointment);
          this.doctor_data.total_appointment = res[0].total_appointment;
          this.doctor_data.f_name = res[0].f_name;
          this.doctor_data.id = res[0].id;
          this.doctor_data.l_name = res[0].l_name;
          this.doctor_data.image = res[0].image;
          this.doctor_data.total_rating = res[0].total_rating;
          this.doctor_data.patient_count = res[0].patient_count;
          this.doctor_data.specialization = res[0].specialization;
          this.get_hospital(res[0].hospital_id);
        },
        (err) => console.log(err)
      );
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

  get_date($event) {
    this.appointment_date = moment($event._d);
    this.appointment_day = this.appointment_date.format('dddd');
    this.appointment_date = this.appointment_date.format('YYYY-MM-DD');
    let radios = document.getElementsByTagName('input');
    this.hospital_id ? this.select_hospital = false : this.select_hospital = true;
    this.get_time_slot(this.hospital_id);
  }

  send_hospital_id(event) {
    this.hospital_id = event.detail.value;
    this.select_hospital = false;
    this.get_time_slot(this.hospital_id);
  }

  get_time_slot(hospital_id) {
    this.selected_time_slot_id = null;
    this.appointment_date ? this.appointment_date_error = false : this.appointment_date_error = true;
    if (this.appointment_date && hospital_id) {
      this.loader_visibility = true;
      this.http.get(`${this.url.serverUrl}get_time_slot_userapp?doctor_id=${this.doctor_data.id}
    &hospital_id=${hospital_id}&day=${this.appointment_day}&date=${this.appointment_date}`)
        .subscribe(
          (res) => {
            if (res == 0) {
              this.doctor_on_leave = true;
              this.appointment_date = null;
              this.time_slot_array = null;
              $(".col").removeClass('active');
              $(".time_tab").addClass('hide');
            }
            else {
              this.doctor_on_leave = false;
              this.time_slot_array = res;
              if (this.time_slot_array['booked_slot'].length > 0) {
                this.time_slot_array['morning'] = this.time_slot_array['morning'].filter(({ id: id1 }) => !this.time_slot_array['booked_slot'].some(({ time_slot_id: id2 }) => id2 === id1));

                this.time_slot_array['afternoon'] = this.time_slot_array['afternoon'].filter(({ id: id1 }) => !this.time_slot_array['booked_slot'].some(({ time_slot_id: id2 }) => id2 === id1));

                this.time_slot_array['evening'] = this.time_slot_array['evening'].filter(({ id: id1 }) => !this.time_slot_array['booked_slot'].some(({ time_slot_id: id2 }) => id2 === id1));
              }
              this.time_slot_array['morning'].length > 0 ? this.no_slot_morning = false : this.no_slot_morning = true;
              this.time_slot_array['afternoon'].length > 0 ? this.no_slot_afternoon = false : this.no_slot_afternoon = true;
              this.time_slot_array['evening'].length > 0 ? this.no_slot_evening = false : this.no_slot_evening = true;
              this.hide_show_time_slot('morning');
            }
            this.loader_visibility = false;
          },
          (err) => console.log(err)
        );
    }
  }

  async book_appointment() {
    this.selected_time_slot_id ? this.select_time_error = false : this.select_time_error = true;
    this.appointment_date ? this.appointment_date_error = false : this.appointment_date_error = true;
    if (this.selected_time_slot_id && this.doctor_data.id && this.hospital_id && this.appointment_date) {
      const modal = await this.modal.create({
        component: SelectuserPage,
        cssClass: "selectuser_modal"
      });
      await modal.present();
      await modal.onDidDismiss().then(async (data) => {
        if (data.data.user_id) {
          this.loader_visibility = true;
          let formdata = {
            'doctor_id': this.doctor_data.id,
            'hospital_id': this.hospital_id,
            'time': this.selected_time,
            'time_slot_id': this.selected_time_slot_id,
            'visit_type': 'Consultation',
            'patient_id': data.data.user_id,
            'date': this.appointment_date,
            'book_from': 'walkin'
          };
         
          this.http
            .post(`${this.url.serverUrl}book_appointment`, formdata)
            .subscribe(
              (res) => {
                this.loader_visibility = false;
                if (res > 0) {
                  this.router.navigate(['/confirmappointment']);
                }
                if (res == 0) {

                  alert('Slot already book. Try another slot or date.')
                }
              },
              (err) => console.log(err)
            );
        }
      });
    }
  }

  hide_show_time_slot(type) {
    this.appointment_date ? this.appointment_date_error = false : this.appointment_date_error = true;
    if (this.hospital_id && this.appointment_date) {
      $(".col").removeClass('active');
      $("#col" + type).addClass('active');
      $(".time_tab").addClass('hide');
      $("#time_tab" + type).removeClass('hide');
    }
  }
}
