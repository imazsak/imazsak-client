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
    this.subscription = this.imazsak.notificationCountLabel$().subscribe(label => {
      this.label = label;
      this.hidden = label.length === 0;
    });
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
