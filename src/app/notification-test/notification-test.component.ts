import {Component} from '@angular/core';
import {ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-notification-test',
  templateUrl: './notification-test.component.html'
})
export class NotificationTestComponent {

  constructor(private imazsak: ImazsakService) {
  }

  pushTest() {
    this.imazsak.pushTest().subscribe();
  }

}
