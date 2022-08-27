import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.page.html',
  styleUrls: ['./patient-history.page.scss'],
})
export class PatientHistoryPage implements OnInit {
  patient_history;
  patient_data = {
    gender: null,
    id: null,
    f_name: null,
    l_name: null,
    dob: null
  }
  no_history: boolean = false;
  loader_visibility: boolean = true;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.get_patient_history(id);
  }

  get_patient_history(id) {
    this.http.get(`${this.url.serverUrl}get_patient_history?id=${id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.patient_history = res['history'];
          console.table(this.patient_history);
          this.patient_data['gender'] = res['patient_data'].gender;
          this.patient_data['id'] = res['patient_data'].id;
          this.patient_data['f_name'] = res['patient_data'].f_name;
          this.patient_data['l_name'] = res['patient_data'].l_name;
          this.patient_data['dob'] = res['patient_data'].dob;
          this.patient_history.length > 0 ? this.no_history = false : this.no_history = true;

        })
  }

  add_details(formdata: NgForm) {
    console.log(2);
  }
}
