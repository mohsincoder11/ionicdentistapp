import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  home: string;
  opd: string;
  reports: string;
  profilepage: string;
  allpatient: string;

  constructor(public router: Router) { }

  ngOnInit() {

    // console.log(this.router.url);

    if (this.router.url == '/dashboard') {
      this.home = 'active';
    }
    if (this.router.url == '/opd' || this.router.url == '/prescription') {
      this.opd = 'active';
    }
    if (this.router.url == '/reports') {
      this.reports = 'active';
    }
    if (this.router.url == '/all-category') {
      this.home = 'active';
    }
    if (this.router.url == '/profilepage') {
      this.profilepage = 'active';
    }
    if (this.router.url == '/allpatient') {
      this.allpatient = 'active';
    }

  }

}
