import {Component, OnInit} from '@angular/core';
import {ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-notifications-button',
  templateUrl: './notifications-button.component.html'
})
export class NotificationsButtonComponent implements OnInit {

  label = '';
  hidden = true;

  constructor(private imazsak: ImazsakService) {
    this.imazsak.listNotifications$().subscribe(notifications => {
      const l = notifications.filter(noti => !noti.meta.isRead).length;
      if (l === 0) {
        this.hidden = true;
      } else {
        if (l < 10) {
          this.label = '' + l;
        } else {
          this.label = '9+';
        }
        this.hidden = false;
      }
    });
  }

  ngOnInit(): void {
  }

}
