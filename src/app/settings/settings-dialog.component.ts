import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: 'settings-dialog.component.html',
})
export class SettingsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
