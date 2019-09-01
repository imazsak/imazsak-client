import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroupMemberListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';


export interface PrayDialogData {
  prayer?: GroupPrayerListData;
  groupId: string;
}


@Component({
  selector: 'app-pray-dialog',
  templateUrl: './pray-dialog.component.html',
  styleUrls: ['./pray-dialog.component.scss']
})
export class PrayDialogComponent implements OnInit {

  isOnlyOne = true;
  members: GroupMemberListData[] = [];
  prayerList: GroupPrayerListData[] = [];
  prayer: GroupPrayerListData = {id: '', userId: '', message: '', };

  constructor(
    public dialogRef: MatDialogRef<PrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrayDialogData,
    private imazsak: ImazsakService
  ) {
    this.isOnlyOne = !!data.prayer;
    this.loadNextPrayer();
    this.loadGroupMembers();
  }

  ngOnInit() {
  }

  pray() {
    this.imazsak.sendPray(this.data.groupId, this.prayer.id).subscribe(_ => {
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
    } else if (!!this.data.groupId) {
      if (this.prayerList.length === 0) {
        this.imazsak.loadNext10Prayer([this.data.groupId]).subscribe(prayers => {
          this.prayerList = prayers;
          this.prayer = this.prayerList.shift();
        });
      } else {
        this.prayer = this.prayerList.shift();
      }
    } else {
      console.log('load prayer from all');
      // todo laod from all
    }
  }

  loadGroupMembers() {
    this.imazsak.listGroupMembers(this.data.groupId).subscribe(members => this.members = members);
  }
}
