import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-no-internet-dialog',
  templateUrl: './no-internet-dialog.component.html'
})
export class NoInternetDialogComponent {
  constructor(public dialogRef: MatDialogRef<NoInternetDialogComponent>) {
  }
}
