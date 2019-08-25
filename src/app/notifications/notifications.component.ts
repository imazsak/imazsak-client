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
    this.imazsak.listNotifications().subscribe(notifications => this.notifications = notifications);
  }

}
