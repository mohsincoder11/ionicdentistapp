import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-otpconfirm',
  templateUrl: './otpconfirm.page.html',
  styleUrls: ['./otpconfirm.page.scss'],
})
export class OtpconfirmPage implements OnInit {
  mobile_number;
  otp;
  otp_error:boolean=false;
  constructor(
    private route: ActivatedRoute,
    public router: Router

  ) { }

  ngOnInit() {
  }

  resend() {
    $(".dark").addClass('disable');
    this.time_out();
    }

 

  time_out() {
    let time = 90;
    const interval = setInterval(() => {
      let formatted = moment.utc(time * 1000).format('mm:ss');
      $("#timer").text(formatted);
      time--;
      if (time < 0) {
        $(".dark").removeClass('disable');
        clearInterval(interval);
      }
    }, 1000)
  }



  ionViewWillEnter() {
    this.time_out();

    this.mobile_number = this.route.snapshot.paramMap.get('number');
    this.otp = this.route.snapshot.paramMap.get('otp');
  }
  verify_otp() {
    if ($("#1").val() && $("#2").val() && $("#3").val() && $("#4").val()) {
      let input_otp = $("#1").val() + $("#2").val() + $("#3").val() + $("#4").val();
     
      if(this.otp==input_otp)
      this.router.navigate(['/resetpassword/'+this.mobile_number]);
      else
      this.otp_error=true;
    }
  }

  focusnext(event) {
    this.otp_error=false;

    if (event.target.value.length > 0) {
      $('#' + event.target.id).addClass('focus_class');

      if (event.target.id == 4) {
        this.verify_otp();
      }
      else {
        let movenext = +parseInt(event.target.id) + 1;
        document.getElementById('' + movenext).focus();
      }
    }
    else {
      $('#' + event.target.id).removeClass('focus_class');
    }

  }
}
