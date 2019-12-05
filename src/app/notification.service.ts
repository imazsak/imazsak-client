import {Injectable} from '@angular/core';
import generateUuid from './uuid.js';
import {SwPush} from '@angular/service-worker';
import {ImazsakService} from './imazsak.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly VAPID_PUBLIC_KEY = 'BFUk1ByQD5TJZdbXyquR_cmwy4dpNOLkE7dKEuHZj0G2eb385gRsjtnmnGDU62UgvaANFQA9ifa_YY6-b4_4u1g=';

  constructor(private swPush: SwPush, private auth: AuthService, private imazsak: ImazsakService) {
    if (this.swPush.isEnabled) {
      this.initDeviceId();
      this.auth.isLoggedIn().subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.refreshSubscription();
        } else {
          this.unsubscribe();
        }
      });
    } else {
      console.log('PUSH not enabled :(');
    }
  }

  private initDeviceId(): void {
    if (!localStorage.deviceId) {
      localStorage.deviceId = generateUuid();
    }
  }

  private refreshSubscription(): void {
    this.swPush.subscription.subscribe(subMb => {
      if (subMb === null) {
        this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY})
          .then(sub => this.imazsak.pushSubscribe(localStorage.deviceId, sub).subscribe())
          .catch(_ => this.unsubscribe());
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
    this.imazsak.pushUnsubscribe(localStorage.deviceId);
  }


}
