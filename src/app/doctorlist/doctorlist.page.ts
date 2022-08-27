import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Platform, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.page.html',
  styleUrls: ['./doctorlist.page.scss'],
})
export class DoctorlistPage implements OnInit {
  doctor_list;
  backToTop: boolean = false;
  @ViewChild(IonContent) content: IonContent;
  loader_visibility: boolean = true;
  search_doctor: string;
  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public platform: Platform,
    public router: Router

  ) { }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.get_doctor_for_user_app();
  }
  get_doctor_for_user_app() {
    this.http.get(`${this.url.serverUrl}get_doctor_for_user_app`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.doctor_list = res['doctor_list'];
          //  console.table(this.doctor_list);
        },
        (err) => console.log(err)
      );
  }

  getScrollPos(pos) {
    if (pos > this.platform.height()) {
      this.backToTop = true;
    } else {
      this.backToTop = false;
    }
  }

  gotToTop() {
    this.content.scrollToTop(1800);
  }

  goto_doctor_details(id) {
    this.router.navigate(['/doctordetails/' + id]);
  }







}