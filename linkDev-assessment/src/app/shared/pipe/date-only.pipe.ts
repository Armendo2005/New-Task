import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateOnly',
  standalone: true
})
export class DateOnlyPipe implements PipeTransform {


  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    if (!value) {
      return 'Invalid date';
    }

    let parsedDate: Date;

    // Handle different input formats by standardizing
    if (value.includes('/')) {
      // Format: dd/MM/yyyy
      const [day, month, year] = value.split(' ')[0].split('/');
      parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    } else if (value.includes('-')) {
      // ISO format or similar
      parsedDate = new Date(value);
    } else {
      // Attempt to parse as simple Date object string
      parsedDate = new Date(value);
    }

    if (isNaN(parsedDate.getTime())) {
      return 'Invalid date';
    }

    return this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || 'Invalid date';
  }

  // constructor(private datePipe: DatePipe) {}

  // transform(value: any, format: string = 'shortDate'): string | null {
  //   if (!value) {
  //     return null;
  //   }

  //   // Parse the date value into a Date object
  //   const date = new Date(value);

  //   // If the date is invalid, return 'Invalid Date'
  //   if (isNaN(date.getTime())) {
  //     return 'Invalid Date';
  //   }

  //   // Format the date using Angular's DatePipe
  //   return this.datePipe.transform(date, format);
  // }


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
