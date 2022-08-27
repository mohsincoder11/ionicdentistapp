import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UrlService } from "../services/url/url.service";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.page.html',
  styleUrls: ['./profilepage.page.scss'],
})
export class ProfilepagePage implements OnInit {
  is_admin: boolean = false;
  session_data = {
    f_name: "",
    l_name: "",
    specialization: "",
    image: ""
  };
  constructor(
    public storage: Storage,
    public router: Router,
    public url: UrlService,
    private socialSharing: SocialSharing,

  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storage.get('login_details_doctor').then(res => {
      res.role == "admin" ? this.is_admin = true : this.is_admin = false;
      this.session_data.f_name = res.f_name;
      this.session_data.l_name = res.l_name;
      this.session_data.image = res.image;
      this.session_data.specialization = res.specialization;
    })
  }

  sign_out() {
    this.storage.remove('login_details_doctor').then(re => {
      this.router.navigateByUrl('/login');
    })
  }

  socialshare()
  {
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=io.doctorapp.starter',
    };
    this.socialSharing.shareWithOptions(options);
  }

 open_playstore(){
    console.log(11);
    window.open("https://play.google.com/store/apps/details?id=io.doctorapp.starter","_system");
  }
}
