import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName',
  standalone: true
})
export class CategoryNamePipe implements PipeTransform {

  transform(code: number): string {
    switch (code) {
      case 0:
        return 'Conference';
      case 1:
        return 'Festival';
      case 2:
        return 'Press Event';
      case 3:
        return 'Exhibition';
      case 4:
        return 'Public Event';
      default:
        return 'Unknown';
    }
  }

}
