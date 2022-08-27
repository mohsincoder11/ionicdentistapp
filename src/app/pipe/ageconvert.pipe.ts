import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageconvert'
})
export class AgeconvertPipe implements PipeTransform {

  transform(value: any): any{
    var timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);  
    return age;
  }

}
