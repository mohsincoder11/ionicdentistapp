import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
declare var $: any;

@Component({
  selector: 'app-opd',
  templateUrl: './opd.page.html',
  styleUrls: ['./opd.page.scss'],
})
export class OpdPage implements OnInit {
  contentLoaded = false;

  public items: any = [];
  all_appointment;
  already_seen;
  tobe_seen;
  selectedslide: any;
  active_status: string = '';
  segment = 1;
  sliderOptions = {
    initialSlide: 0,
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
  }
  user_id;
  role;
  backToTop: boolean = false;
  overall: boolean = false;
  tobe: boolean = false;
  alredy_seen: boolean = false;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private platform: Platform,
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService
  ) {
  }

  ionViewWillEnter() {
    this.get_all_appointment();
  }

  get_all_appointment() {
    this.storage.get('login_details_doctor').then(res => {
      this.user_id = res.id;
      this.role = res.role;
      this.http.get(`${this.url.serverUrl}get_all_appointment?user_id=${this.user_id}&role=${this.role}`)
        .subscribe(
          (res) => {     
            console.log(res);
            this.all_appointment = res;
            this.already_seen = this.all_appointment.filter(function (e) {
              return e.status == 2;
            });           
            this.tobe_seen = this.all_appointment.filter(function (e) {
              return e.status == 1 || e.status == 0;
            });
            this.contentLoaded = true;
            this.all_appointment.length>0 ? this.overall=false : this. overall=true;
            this.tobe_seen.length>0 ? this.tobe=false : this.tobe=true;
            this.already_seen.length>0 ? this.alredy_seen=false : this.alredy_seen=true;
          },
          (err) => console.log(err)
        );
    })
  }

  doRefresh(event) {
    this.get_all_appointment();
    event.target.complete();
  }

  ngOnInit() {
    this.active_status = 'active';
  }

  toggle_div(id) {
    $('.section').removeClass("collapsed");
    $('#collapsible' + id).addClass("collapsed");
    $('.downarrow').removeClass("collapsed");
    $('#downarrow' + id).addClass("collapsed");
  }

  async segmentChanged(ev: any) {
    this.content.scrollToTop(50);
    await this.selectedslide.slideTo(this.segment);
    document.getElementById("segment-" + this.segment).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  async slidesChanged(slides) {
    this.selectedslide = slides;
    slides.getActiveIndex().then(selectedIndex => {
      if (selectedIndex < 1) {
        this.segment = 3;
      }
      if (selectedIndex > 3) {
        this.segment = 1;
      }
      if (selectedIndex > 0 && selectedIndex < 4) {
        this.segment = selectedIndex;
      }
    })
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

  notinhsopital(id) {
    $("#action_col_notin" + id).addClass('disable');
    $("#action_col_check" + id).addClass('disable');
    this.http.get(`${this.url.serverUrl}not_in_hospital?id=${id}`)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
      }

  patient_check(id) {
    $("#action_col_notin" + id).addClass('disable');
    $("#action_col_check" + id).addClass('disable');
    this.http.get(`${this.url.serverUrl}patient_checked?id=${id}`)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
  }


}
