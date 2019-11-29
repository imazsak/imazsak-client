import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImazsakService} from '../imazsak.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notifications-button',
  templateUrl: './notifications-button.component.html'
})
export class NotificationsButtonComponent implements OnInit, OnDestroy {

  label = '';
  hidden = true;

  private subscription: Subscription;

  constructor(private imazsak: ImazsakService) {
  }

  ngOnInit(): void {
    this.subscription = this.imazsak.listNotifications$().subscribe(notifications => {
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

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
