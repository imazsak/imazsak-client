import {Component, OnInit} from '@angular/core';
import {ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications = [];

  constructor(public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listNotifications$().subscribe(notifications => this.notifications = notifications);
  }

  delete(id: string) {
    this.notifications = this.notifications.filter(noti => noti.id !== id);
    this.imazsak.deleteNotification(id).subscribe();
  }

  read(id: string) {
    this.notifications.find(noti => noti.id === id).meta.isRead = true;
    this.imazsak.readNotification(id).subscribe();
  }

}
