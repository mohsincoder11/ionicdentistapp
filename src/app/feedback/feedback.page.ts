import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  category:boolean=false;
  description:boolean=false;
  loader_visibility:boolean=false;
  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService

  ) { }

  ngOnInit() {
  }
  submit_feedback(formdata:NgForm)
  {
    formdata.value.category ? this.category=false : this.category=true;
    formdata.value.description ? this.description=false : this.description=true;
    if(formdata.value.category && formdata.value.description)
    {
      this.loader_visibility=true;
      this.storage.get('login_details_doctor').then(res => {
        formdata.value.user_id=res.id;       
this.http
      .post(`${this.url.serverUrl}app_feedback`, formdata.value)
      .subscribe(
        (res) => {
          this.toaster.toaster_show('Feedback submitted successfully.', 'success', 'white');

          this.loader_visibility=false;
          formdata.resetForm();
        },
        (err) => console.log(err)
      );
      })      
    }
  }

  

}
