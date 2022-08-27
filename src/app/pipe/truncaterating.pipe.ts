import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;

@Pipe({
  name: 'truncaterating'
})
export class TruncateratingPipe implements PipeTransform {


  transform(value: any): any{
  //let value2=value.substring(0, 3); 
  let value2=value.toString(); 
   value2=value2.substr(0, 3)
   return value2;
  }

}
