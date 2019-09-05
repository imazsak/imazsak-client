import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {

  transform(value: number | Date): any {
    const time = (value instanceof Date) ? value.getTime() : value;
    const agoMillis = new Date().getTime() - time;
    const s = 1000;
    const m = 60 * s;
    const h = 60 * m;
    const d = 24 * h;
    if (agoMillis < 10 * s) {
      const sec = Math.ceil(agoMillis / s);
      return `${sec}s`;
    } else if (agoMillis < 45 * m) {
      const min = Math.ceil(agoMillis / m);
      return `${min}m`;
    } else if (agoMillis < 20 * h) {
      const hour = Math.ceil(agoMillis / h);
      return `${hour}h`;
    } else {
      const day = Math.ceil(agoMillis / d);
      return `${day}d`;
    }
  }

}
