import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return value; // Return the original value if the date parsing fails
      }
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    } catch (error) {
      console.error('Error in DateFormatPipe:', error);
      return value; // Return the original value if the date parsing fails
    }
  }

  // transform(value: string): string {
  //   const date = new Date(value);
  //   const monthNames = [
  //     'January', 'February', 'March', 'April', 'May', 'June',
  //     'July', 'August', 'September', 'October', 'November', 'December'
  //   ];
  //   return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  // }

}
