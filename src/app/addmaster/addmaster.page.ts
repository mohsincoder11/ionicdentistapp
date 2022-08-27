import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Storage } from '@ionic/storage';
declare var $: any;
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-addmaster',
  templateUrl: './addmaster.page.html',
  styleUrls: ['./addmaster.page.scss'],
})
export class AddmasterPage implements OnInit {
  doctor_list;
  hospital_list;
  session_data;
  no_record_h: boolean = false;
  no_record_d: boolean = false;
  hospital_id_array: any;
  f_name: boolean = false;
  l_name: boolean = false;
  mobile: boolean = false;
  mobile_length: boolean = false;
  hospital_id: boolean = false;
  specialization: boolean = false;
  mobile_present: boolean = false;
  password: boolean = false;
  hospital_name: boolean = false;
  address: boolean = false;
  city: boolean = false;
  loader_visibility: boolean = true;
  doctor_delete_id;
  hospital_delete_id;

  hospital_data: any = {
    id: "",
    hospital_name: "",
    address: "",
    city: "",
    input_mode: ""
  };

  doctor_data: any = {
    id: "",
    f_name: "",
    l_name: "",
    specialization: "",
    mobile: "",
    email: "",
    password: "",
    input_mode: "",
  };
  password_field_hidden = false;

  constructor(
    private router: Router,
    public http: HttpClient,
    public url: UrlService,
    private storage: Storage,
    public toaster: ToasterService

  ) {
  }

  ngOnInit() {
    this.switch_view('hospital');

  }

  ionViewDidEnter() {
    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
      this.get_doctor();
      this.get_hospital();
    })
  }

  switch_view(type) {
    $(".custom_modal").removeClass("show");
    $(".custom_modal").addClass("hide");
    $(".col").removeClass("active");
    $("#" + type).addClass("active");
    $(".visibility").addClass("hide");
    $("#visibility_" + type).removeClass("hide");

  }

  //Doctor
  add_doctor(formdata: NgForm) {
    this.mobile_present = false;
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.mobile ? this.mobile = false : this.mobile = true;
    formdata.value.specialization ? this.specialization = false : this.specialization = true;
    formdata.value.hospital_id ? this.hospital_id = false : this.hospital_id = true;
    formdata.value.mobile.toString().length == 10 ? this.mobile_length = false : this.mobile_length = true;
    if (formdata.value.f_name && formdata.value.l_name && formdata.value.specialization &&
      formdata.value.mobile.toString().length == 10 && formdata.value.hospital_id.length > 0
    ) {
      this.loader_visibility = true;
      this.mobile_length = false;
      formdata.value.parent_id = this.session_data.id;

      this.http
        .post(`${this.url.serverUrl}register_doctor`, formdata.value)
        .subscribe(
          (res) => {
            console.log(res);
            if (res == '-1') {
              this.mobile_present = true;
            }
            else if (res == 2) {
              $("#hospital_item").show();
              $("#button_text2").text('Add Doctor');
              formdata.value.doctor_update_id = null;
              this.toaster.toaster_show('Doctor details updated successfully.', 'success', 'white');
            }
            else if (res > 0) {
              this.toaster.toaster_show('Doctor added successfully.', 'success', 'white');
            }
            formdata.resetForm();
            this.get_doctor();
          },
          (err) => console.log(err)
        );
    }

  }


  delete_doctor(id) {
    $("#doctor_modal").removeClass("hide");
    $("#doctor_modal").addClass("show");
    this.doctor_delete_id = id;
  }

  confirm_delete_doctor() {     
         this.close_modal('doctor_modal');

    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}delete_doctor?id=${this.doctor_delete_id}`)
      .subscribe(
        (res) => {
          this.toaster.toaster_show('Doctor deleted successfully.', 'error', 'white');
          this.get_doctor();
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
          this.doctor_list.length < 1 ? this.no_record_d = true : this.no_record_d = false;
        },
        (err) => console.log(err)
      );
  }

  edit_doctor(id) {
    $("#hospital_item").hide();
    this.password_field_hidden = true;
    $("#button_text2").text('Update Doctor');
    let edit_doctor = this.doctor_list.filter(function (e) {
      return e.id == id;
    });
    this.hospital_id_array = edit_doctor[0].hospital_id.split(",");
    this.doctor_data = {
      id: edit_doctor[0].id,
      f_name: edit_doctor[0].f_name,
      l_name: edit_doctor[0].l_name,
      specialization: edit_doctor[0].specialization,
      mobile: edit_doctor[0].mobile,
      email: edit_doctor[0].email,
      password: edit_doctor[0].password,
      input_mode: 'update'
    };
  }
  //Hospital
  add_hospital(formdata: NgForm) {
    formdata.value.hospital_name ? this.hospital_name = false : this.hospital_name = true;
    formdata.value.address ? this.address = false : this.address = true;
    formdata.value.city ? this.city = false : this.city = true;

    if (formdata.value.hospital_name && formdata.value.address && formdata.value.city) {
      this.loader_visibility = true;
      this.mobile_length = false;
      formdata.value.master_id = this.session_data.id;

      this.http
        .post(`${this.url.serverUrl}register_hospital`, formdata.value)
        .subscribe(
          (res) => {
            if (res > 0) {
              this.toaster.toaster_show('Hospital added successfully.', 'success', 'white');
            }
            else {
              this.toaster.toaster_show('Hospital updated successfully.', 'success', 'white');
            }

            $("#button_text").text('Add Hospital');

            formdata.resetForm();
            this.get_hospital();
          },
          (err) => console.log(err)
        );
    }
  }


  delete_hospital(id) {
    $("#hospital_modal").removeClass("hide");
    $("#hospital_modal").addClass("show");
    
    this.hospital_delete_id = id;
  }

  confirm_delete_hospital() {
    this.close_modal('hospital_modal');

    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}delete_hospital?id=${this.hospital_delete_id}`)
      .subscribe(
        (res) => {
          this.toaster.toaster_show('Hospital deleted successfully.', 'error', 'white');
          this.get_hospital();
        },
        (err) => console.log(err)
      );
  }

  get_hospital() {
    this.http.get(`${this.url.serverUrl}get_hospital?master_id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          this.hospital_list = res;
          this.hospital_list.length < 1 ? this.no_record_h = true : this.no_record_h = false;
          this.loader_visibility = false;
        },
        (err) => console.log(err)
      );
  }

  edit_hospital(id) {
    $("#button_text").text('Update Hospital');
    let edit_hospital = this.hospital_list.filter(function (e) {
      return e.id == id;
    });
    this.hospital_data = {
      id: edit_hospital[0].id,
      hospital_name: edit_hospital[0].hospital_name,
      address: edit_hospital[0].address,
      city: edit_hospital[0].city,
      input_mode: 'update'
    };
  }

  close_modal(id) {
    $("#" + id).removeClass("show");
    $("#" + id).addClass("hide");

  }
}
