import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImazsakService, NotificationListData} from '../imazsak.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit, OnDestroy {

  notification: NotificationListData;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.imazsak.listNotifications$().subscribe(notifications => {
      this.notification = notifications.find(noti => noti.id === id);
    });
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}