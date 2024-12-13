import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFormatter',
})
export class IdFormatterPipe implements PipeTransform {
  transform(value: string, prefix: string): string {
    if (!value || !prefix) return '';
    const shortGuid = value.replace(/-/g, '').substring(0, 3);
    return `${prefix}${shortGuid}`;
  }
}
