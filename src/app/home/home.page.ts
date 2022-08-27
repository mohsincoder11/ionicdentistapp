import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public username: boolean = false;
  public password: boolean = false;
  private loader_visibility=false;
  constructor(     
    public router: Router,  
    public storage:Storage
 
    )  { }

  ngOnInit() {
    setTimeout(() => {
      this.storage.get('login_details_doctor').then(res => {
        if (res)
          this.router.navigateByUrl('/dashboard');
        else
          this.router.navigateByUrl('/login');
      })
    },2500);
  }

  

}
