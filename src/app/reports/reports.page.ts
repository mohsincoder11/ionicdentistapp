import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  contentLoaded=false;
  constructor() { 
    setTimeout(()=>{
      this.contentLoaded=true;
    },1200);
  }
  

  ngOnInit() {
  }

}
