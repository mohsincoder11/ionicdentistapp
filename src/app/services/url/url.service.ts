import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  //offline
//   serverUrl = 'http://localhost/dentist/api/';
//     patient_image = 'http://localhost/dentist/public/images/patient';
//     doctor_image='http://localhost/dentist/public/images/doctor'; 
//  // online
   serverUrl = 'https://demo.webmediaindia.com/dentist/api/';
   patient_image = 'https://demo.webmediaindia.com/dentist/public/images/patient';
   doctor_image='https://demo.webmediaindia.com/dentist/public/images/doctor'; 
   

  constructor() { }
}
