import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: 'feedback-dialog.component.html',
})
export class FeedbackDialogComponent {
  message = '';

  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>) {
  }

}
