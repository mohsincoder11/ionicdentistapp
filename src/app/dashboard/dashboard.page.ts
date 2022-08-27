import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
declare var $: any;

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  loader_visibility = true;
  selectedslide: any;
  segment = 0;
  walkin_count = 0;
  patient_count = 0;
  chart_walkin_count = 0;
  chart_online_count = 0;
  role = 'user';
  online_count = 0;
  session_data;
  chart_month_data;

  sliderOptions = {
    initialSlide: 1,
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 2200,
    }, speed: 1500,
  }

  constructor(
    public router: Router,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/dashboard')) {
        // Show Exit Alert!
        this.showExitConfirm();
      } else {
        // Navigate to back page
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });
  }

  ngOnInit() {
    this.storage.get('login_details_doctor').then(res => {
      this.session_data = res;
      this.role = res.role;
      this.get_chart_data();
    })

  }

  ionViewWillEnter() {
    var status = navigator.onLine;
    if (!status) {
      document.getElementById("internet_error").textContent = "Check internet connection.";
      var x = document.getElementById("internet_snackbar");
      x.className = "show_danger";
      setTimeout(function () {
        x.className = x.className.replace("show_danger", "");
      }, 10000);
    }
    else {
      this.get_all_appointment();
    }
  }

  make_barChart() {
    var bar = (<any>document.getElementById('barchart')).getContext('2d');
    var myChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: [
            this.chart_month_data['w_c_count']['01'] ? this.chart_month_data['w_c_count']['01'].length : 0,
            this.chart_month_data['w_c_count']['02'] ? this.chart_month_data['w_c_count']['02'].length : 0,
            this.chart_month_data['w_c_count']['03'] ? this.chart_month_data['w_c_count']['03'].length : 0,
            this.chart_month_data['w_c_count']['04'] ? this.chart_month_data['w_c_count']['04'].length : 0,
            this.chart_month_data['w_c_count']['05'] ? this.chart_month_data['w_c_count']['05'].length : 0,
            this.chart_month_data['w_c_count']['06'] ? this.chart_month_data['w_c_count']['06'].length : 0,
            this.chart_month_data['w_c_count']['07'] ? this.chart_month_data['w_c_count']['07'].length : 0,
            this.chart_month_data['w_c_count']['08'] ? this.chart_month_data['w_c_count']['08'].length : 0,
            this.chart_month_data['w_c_count']['09'] ? this.chart_month_data['w_c_count']['09'].length : 0,
            this.chart_month_data['w_c_count']['10'] ? this.chart_month_data['w_c_count']['10'].length : 0,
            this.chart_month_data['w_c_count']['11'] ? this.chart_month_data['w_c_count']['11'].length : 0,
            this.chart_month_data['w_c_count']['12'] ? this.chart_month_data['w_c_count']['12'].length : 0,

          ], label: 'Walking',
          borderColor: '#e60889',
          backgroundColor: '#f533a4',
        },
        {
          data: [
            this.chart_month_data['o_c_count']['01'] ? this.chart_month_data['o_c_count']['01'].length : 0,
            this.chart_month_data['o_c_count']['02'] ? this.chart_month_data['o_c_count']['02'].length : 0,
            this.chart_month_data['o_c_count']['03'] ? this.chart_month_data['o_c_count']['03'].length : 0,
            this.chart_month_data['o_c_count']['04'] ? this.chart_month_data['o_c_count']['04'].length : 0,
            this.chart_month_data['o_c_count']['05'] ? this.chart_month_data['o_c_count']['05'].length : 0,
            this.chart_month_data['o_c_count']['06'] ? this.chart_month_data['o_c_count']['06'].length : 0,
            this.chart_month_data['o_c_count']['07'] ? this.chart_month_data['o_c_count']['07'].length : 0,
            this.chart_month_data['o_c_count']['08'] ? this.chart_month_data['o_c_count']['08'].length : 0,
            this.chart_month_data['o_c_count']['09'] ? this.chart_month_data['o_c_count']['09'].length : 0,
            this.chart_month_data['o_c_count']['10'] ? this.chart_month_data['o_c_count']['10'].length : 0,
            this.chart_month_data['o_c_count']['11'] ? this.chart_month_data['o_c_count']['11'].length : 0,
            this.chart_month_data['o_c_count']['12'] ? this.chart_month_data['o_c_count']['12'].length : 0,

          ], label: 'Online',
          borderColor: '#0638ec',
          backgroundColor: '#2a57f7',
        }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
        },
        animation: {
          duration: 1200,
        },
      }
    });
  }

  make_doghnutchart() {
    var doughnutChart = (<any>document.getElementById('doughnutChart')).getContext('2d');
    this.doughnutChart = new Chart(doughnutChart, {
      type: 'doughnut',
      data: {
        labels: ['Walking Appointments', 'Online Appointments'],
        datasets: [{
          label: '# of Projects',
          data: [this.chart_walkin_count, this.chart_online_count],
          backgroundColor: [
            'rgba(230, 8, 137, 0.7)',
            'rgba(6, 56, 236, 0.7)',
          ],
          hoverBackgroundColor: [
            '#e60889',
            '#0638ec',
          ]
        }]
      },
      options: {
        animation: {
          duration: 1200,
        }
      }
    });
  }

  async segmentChanged(ev: any) {
    if (ev.detail.value == "more") {
      this.router.navigate(['all-category']);
    }
    await this.selectedslide.slideTo(this.segment);
  }
  async slidesChanged(slides) {
    this.selectedslide = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex;
    })
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }



  get_all_appointment() {
    this.http.get(`${this.url.serverUrl}get_dashboard_count?user_id=${this.session_data.id}&role=${this.session_data.role}`)
      .subscribe(
        (res) => {
          if (res != 'null') {
            this.walkin_count = res['walkin'];
            this.online_count = res['online'];
            if (this.role == 'admin')
              this.patient_count = res['total_patient'];
          }
        },
        (err) => console.log(err)
      );
  }

  get_chart_data() {
    this.http.get(`${this.url.serverUrl}get_dashboard_chart_count?user_id=${this.session_data.id}&role=${this.session_data.role}`)
      .subscribe(
        (res) => {
          this.chart_month_data = res;
          this.chart_walkin_count = res['walkin'];
          this.chart_online_count = res['online'];
          this.make_barChart();
          this.make_doghnutchart();
          this.loader_visibility = false;

        },
        (err) => console.log(err)
      );
  }


}
