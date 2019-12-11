import {Injectable} from '@angular/core';
import generateUuid from './uuid.js';
import {SwPush} from '@angular/service-worker';
import {ImazsakService} from './imazsak.service';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private swPush: SwPush, private auth: AuthService, private imazsak: ImazsakService, private router: Router) {
    if (this.swPush.isEnabled) {
      this.initDeviceId();
      this.refreshVapidPublicKey$().subscribe(() => {
        this.auth.isLoggedIn().subscribe(isLoggedIn => {
          if (isLoggedIn) {
            this.refreshSubscription();
          } else {
            this.unsubscribe();
          }
        });
      });
    }
  }

  private initDeviceId(): void {
    if (!localStorage.deviceId) {
      localStorage.deviceId = generateUuid();
    }
  }

  private refreshSubscription(): void {
    this.swPush.subscription.pipe(first()).subscribe(subMb => {
      if (subMb === null) {
        this.swPush.requestSubscription({serverPublicKey: localStorage.vapidPublicKey})
          .then(sub => this.imazsak.pushSubscribe(localStorage.vapidPublicKey, localStorage.deviceId, sub).subscribe())
          .catch(() => this.unsubscribe());
      } else {
        this.imazsak.pushSubscribe(localStorage.vapidPublicKey, localStorage.deviceId, subMb).subscribe(
          () => {
          },
          () => this.unsubscribe());
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

  private refreshVapidPublicKey$(): Observable<any> {
    return this.imazsak.getVapidPublicKey().pipe(map(data => {
      if (data.publicKey !== localStorage.vapidPublicKey) {
        this.unsubscribe();
        localStorage.vapidPublicKey = data.publicKey;
      }
      return;
    }));
  }

}
