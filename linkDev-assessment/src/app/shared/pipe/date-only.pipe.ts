import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateOnly',
  standalone: true
})
export class DateOnlyPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'shortDate'): string | null {
    if (!value) {
      return null;
    }

    // Parse the date value into a Date object
    const date = new Date(value);

    // If the date is invalid, return null
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Format the date using Angular's DatePipe
    return this.datePipe.transform(date, format);
  }


  // transform(value: Date | string | null): string {
  //   if (!value) return '';

  //   const date = new Date(value);

  //   // Check if the date is valid
  //   if (isNaN(date.getTime())) {
  //     return 'Invalid Date';
  //   }

  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();

  //   return `${day}-${month}-${year}`;
  // }

  // transform(value: string): string {
  //   if (value) {
  //     const date = new Date(value);
  //     return date.toLocaleDateString();
  //   }
  //   return '';
  // }

}
