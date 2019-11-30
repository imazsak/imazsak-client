import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImazsakService, NotificationListData, PrayerCreatedNotificationData} from '../imazsak.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PrayDialogComponent} from '../pray-dialog/pray-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: NotificationListData[] = [];
  private subscription: Subscription;

  constructor(public dialog: MatDialog, public imazsak: ImazsakService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.imazsak.listNotifications$().subscribe(notifications => this.notifications = notifications);
  }

  delete(id: string) {
    this.notifications = this.notifications.filter(noti => noti.id !== id);
    this.imazsak.deleteNotification(id).subscribe();
  }

  read(notification: NotificationListData) {
    this.notifications.find(noti => noti.id === notification.id).meta.isRead = true;
    this.imazsak.readNotification(notification.id).subscribe();
    switch (notification.meta.notificationType) {
      case 'PRAYER_CREATED':
        this.openPrayDialog(notification.message as PrayerCreatedNotificationData);
        break;
      case 'PRAYER_CLOSE_FEEDBACK':
        this.router.navigate(['/notifications', notification.id]);
        break;
      default:
    }
  }

  private openPrayDialog(data: PrayerCreatedNotificationData) {
    this.imazsak.listGroupPrayers(data.groupIds[0]).subscribe(prayers => {
      const prayer = prayers.find(p => p.id === data.prayerId);
      this.dialog.open(PrayDialogComponent, {
        data: {prayer, groupIds: data.groupIds}
      });
    });
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
