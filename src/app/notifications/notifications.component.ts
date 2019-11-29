import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImazsakService, NotificationListData} from '../imazsak.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: NotificationListData[] = [];
  private subscription: Subscription;

  constructor(public imazsak: ImazsakService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.imazsak.listNotifications$().subscribe(notifications => this.notifications = notifications);
  }

  delete(id: string) {
    this.notifications = this.notifications.filter(noti => noti.id !== id);
    this.imazsak.deleteNotification(id).subscribe();
  }

  read(id: string) {
    this.notifications.find(noti => noti.id === id).meta.isRead = true;
    this.imazsak.readNotification(id).subscribe();
    this.router.navigate(['/notifications', id]);
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
