import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(menuItems: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return menuItems;
    }
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
