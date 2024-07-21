import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOnly',
  standalone: true
})
export class DateOnlyPipe implements PipeTransform {


  transform(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
