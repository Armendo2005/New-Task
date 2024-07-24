import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return moment(value).format('DD/MM/YYYY');
    }
    return '';
  }

}
