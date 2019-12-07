import {Injectable} from '@angular/core';
import generateUuid from './uuid.js';
import {SwPush} from '@angular/service-worker';
import {ImazsakService} from './imazsak.service';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly VAPID_PUBLIC_KEY = 'BFUk1ByQD5TJZdbXyquR_cmwy4dpNOLkE7dKEuHZj0G2eb385gRsjtnmnGDU62UgvaANFQA9ifa_YY6-b4_4u1g=';

  constructor(private swPush: SwPush, private auth: AuthService, private imazsak: ImazsakService, private router: Router) {
    if (this.swPush.isEnabled) {
      this.handlePushNotificationClicks();
      this.initDeviceId();
      this.auth.isLoggedIn().subscribe(isLoggedIn => {
         if (isLoggedIn) {
          this.refreshSubscription();
        } else {
          this.unsubscribe();
        }
      });
    }
  }

  private handlePushNotificationClicks() {
    this.swPush.notificationClicks.subscribe(data => {
      const notiId = (data.notification.data as any).notificationId;
      const notiType = (data.notification.data as any).notificationType;
      if (!!notiId && !!notiType) {
        switch (notiType) {
          case 'PRAYER_CREATED':
            console.log('TODO PRAYER_CREATED', notiId); // TODO
            break;
          case 'PRAYER_CLOSE_FEEDBACK':
            this.router.navigate(['/notifications', notiId]);
            break;
          default:
        }
      }
    });
  }

  private initDeviceId(): void {
    if (!localStorage.deviceId) {
      localStorage.deviceId = generateUuid();
    }
  }

  private refreshSubscription(): void {
    this.swPush.subscription.pipe(first()).subscribe(subMb => {
        if (subMb === null) {
        this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY})
          .then(sub => {
            this.imazsak.pushSubscribe(localStorage.deviceId, sub).subscribe();
          })
          .catch(() => this.unsubscribe());
      } else {
         this.imazsak.pushSubscribe(localStorage.deviceId, subMb).subscribe();
      }
    });
  }

  private unsubscribe() {
    this.swPush.subscription.subscribe(subMb => {
      if (subMb !== null) {
        subMb.unsubscribe();
      }
    });
    this.imazsak.pushUnsubscribe(localStorage.deviceId).subscribe();
  }


}
