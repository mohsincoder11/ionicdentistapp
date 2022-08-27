import { Injectable } from '@angular/core';
declare var swal: any;
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }


  toaster_show(msg, type, icon_color) {
    const Toast = swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 4000,
      customClass: {
        popup: 'colored-toast'
      },
      iconColor: icon_color,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: type,
      title: "<span style='color:#fff;font-size:0.8em;'>" + msg + "</span> "
    })

  }



}
