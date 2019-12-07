import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {GroupMemberListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';


export interface PrayDialogData {
  prayer?: GroupPrayerListData;
  groupIds: string[];
}


@Component({
  selector: 'app-pray-dialog',
  templateUrl: './pray-dialog.component.html'
})
export class PrayDialogComponent implements OnInit {

  isOnlyOne = true;
  members: GroupMemberListData[] = [];
  prayerList: GroupPrayerListData[] = [];
  prayer: GroupPrayerListData = {id: '', userId: '', message: ''};

  constructor(
    public dialogRef: MatDialogRef<PrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrayDialogData,
    private snackBar: MatSnackBar,
    private imazsak: ImazsakService
  ) {
    this.isOnlyOne = !!data.prayer;
    this.loadNextPrayer();
    this.loadGroupMembers();
  }

  ngOnInit() {
  }

  pray() {
    if (!this.prayer.groupId) {
      console.error('Missing groupId from prayer!');
      this.dialogRef.close();
      return;
    }
    this.imazsak.sendPray(this.prayer.groupId, this.prayer.id).subscribe(() => {
      if (this.isOnlyOne) {
        this.dialogRef.close();
      } else {
        this.loadNextPrayer();
      }
    });
  }

  loadNextPrayer() {
    if (this.isOnlyOne) {
      this.prayer = this.data.prayer;
      if (!this.prayer.groupId && !!this.data.groupIds[0]) {
        this.prayer.groupId = this.data.groupIds[0];
      }
    } else if (this.prayerList.length === 0) {
      this.imazsak.loadNext10Prayer(this.data.groupIds).subscribe(prayers => {
        if (prayers.length === 0) {
          this.snackBar.open('Jelenleg nincs több imakérés!', null, {duration: 3000});
          this.dialogRef.close();
        } else {
          this.prayerList = prayers;
          this.prayer = this.prayerList.shift();
        }
      });
    } else {
      this.prayer = this.prayerList.shift();
    }
  }

  loadGroupMembers() {
    const self = this;
    this.data.groupIds.forEach(groupId => {
      self.imazsak.listGroupMembers(groupId).subscribe(members => {
        self.members = self.members.concat(members);
      });
    });
  }
}
