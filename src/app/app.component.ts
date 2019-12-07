import {Component} from '@angular/core';
import {NotificationService} from './notification.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {fromEvent, merge, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {NoInternetDialogComponent} from './no-internet-dialog/no-internet-dialog.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  private dialogRef: MatDialogRef<NoInternetDialogComponent, any>;

  constructor(noti: NotificationService, public dialog: MatDialog) {
    this.initNoInternetDialog();
  }

  private initNoInternetDialog() {
    this.createOnline$().subscribe(isOnline => {
      if (isOnline) {
        this.closeDialog();
      } else {
        this.openDialog();
      }
    });
  }

  private openDialog() {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(NoInternetDialogComponent, {disableClose: true});
    }
  }

  private closeDialog() {
    if (!!this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  // https://stackoverflow.com/a/57069101
  private createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
