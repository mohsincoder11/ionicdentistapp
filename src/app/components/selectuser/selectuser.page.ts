import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { UrlService } from "../../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.page.html',
  styleUrls: ['./selectuser.page.scss'],
})
export class SelectuserPage implements OnInit {
  patient_member_list;
  family_member_load = false;
  session_data;
  session_id;
  user_id;
  selected_user=null;
  random_patient;
  select_user: boolean = false;

  constructor(
    public modal: ModalController,
    private storage: Storage,
    public url: UrlService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit() { }
  dismiss() {
    this.modal.dismiss(
      {
        user_id: null,
      }
    );
  }

  confirm_appointment() {
    if (this.selected_user) {
      this.modal.dismiss(
        {
          user_id: this.selected_user,
        }
      );
    }
    else {
      this.select_user = true;
    }
  }

  goto_managemember() {
    this.modal.dismiss(
      {
      }
    );
    this.router.navigate(['/managemember']);

  }

  ionViewDidEnter() {
    this.get_random_patient();
  }

  get_patient_member(event) {
    this.selected_user=null;
    this.http.get(`${this.url.serverUrl}search_patient_for_admin?search_keyword=${event.target.value}`)
      .subscribe(
        (res) => {
          console.table(res);
          this.patient_member_list = res;
        },
        (err) => console.log(err)
      );
  }

  get_random_patient() {
    this.http.get(`${this.url.serverUrl}get_random_patient`)
      .subscribe(
        (res) => {
          console.table(res);
          this.family_member_load = true;
          this.random_patient = res;
        },
        (err) => console.log(err)
      );
  }

  select_member(id) {
    $(".custom_radio").prop('checked', false);
    $(".calender_day").removeClass("active");
    $("#border" + id).addClass("active");
    $(".checkbbox").removeClass("show");
    $("#checkbox" + id).addClass("show");
    this.selected_user = id;
  }

  radioGroupChange(event) {
    $(".calender_day").removeClass("active");
    $(".checkbbox").removeClass("show");
    this.selected_user = event.target.value;
  }
}
