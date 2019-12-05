import {Component} from '@angular/core';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(noti: NotificationService) {
  }
}
