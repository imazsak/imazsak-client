import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-close-prayer-dialog',
  templateUrl: './close-prayer-dialog.component.html'
})
export class ClosePrayerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClosePrayerDialogComponent>) {
  }
}
