import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

export interface ClosePrayerDialogResult {
  close: boolean;
  message?: string;
}

@Component({
  selector: 'app-close-prayer-dialog',
  templateUrl: './close-prayer-dialog.component.html'
})
export class ClosePrayerDialogComponent {
  message = '';

  constructor(
    public dialogRef: MatDialogRef<ClosePrayerDialogComponent>) {
  }

  close(close: boolean) {
    const message = this.message.trim().length === 0 ? undefined : this.message.trim();
    this.dialogRef.close({close, message} as ClosePrayerDialogResult);
  }
}
