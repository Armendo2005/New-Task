import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateNoTime',
  standalone: true
})
export class DateNoTimePipe implements PipeTransform {

  transform(value: any): any {
    return (
      new Date(value).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })      
    );
  }

}
