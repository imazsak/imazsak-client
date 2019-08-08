import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {GroupListData} from '../imazsak.service';

export interface CreatePrayDialogData {
  groups: GroupListData[];
}

@Component({
  selector: 'app-create-prayer-dialog',
  templateUrl: 'create-prayer-dialog.component.html',
})
export class CreatePrayerDialogComponent {
  groups = new FormControl();
  message: '';
  isOnlyOneGroup = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePrayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePrayDialogData) {
    this.isOnlyOneGroup = data.groups.length === 1;
  }

  create() {
    const groupIds = this.isOnlyOneGroup ? [this.data.groups[0].id] : this.groups.value;
    const response = {
      message: this.message,
      groupIds
    };
    if (response.groupIds.length !== 0 && !!response.message) {
      this.dialogRef.close(response);
    } else {
      this.dialogRef.close();
    }
  }

}


