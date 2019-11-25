import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-join-to-group-dialog',
  templateUrl: 'join-to-group-dialog.component.html',
})
export class JoinToGroupDialogComponent {

  constructor(public dialogRef: MatDialogRef<JoinToGroupDialogComponent>) {
  }

}
