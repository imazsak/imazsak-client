import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroupMemberListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';


export interface PrayDialogData {
  prayer: GroupPrayerListData;
  groupId: string;
}


@Component({
  selector: 'app-pray-dialog',
  templateUrl: './pray-dialog.component.html',
  styleUrls: ['./pray-dialog.component.scss']
})
export class PrayDialogComponent implements OnInit {

  onlyOne = true;
  members: GroupMemberListData[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrayDialogData,
    private imazsak: ImazsakService
  ) {
    this.onlyOne = !!data.prayer;
    this.loadGroupMembers();
  }

  ngOnInit() {
  }

  pray() {
    this.imazsak.sendPray(this.data.groupId, this.data.prayer.id).subscribe(_ => {
      if (this.onlyOne) {
        this.dialogRef.close();
      } else {
        this.loadNextPrayer();
      }
    });
  }

  loadNextPrayer() {
    if (!!this.data.groupId) {
      console.log('load prayer from group');
      // todo load from group
    } else {
      console.log('load prayer from all');
      // todo laod from all
    }
  }

  loadGroupMembers() {
    this.imazsak.listGroupMembers(this.data.groupId).subscribe(members => this.members = members);
  }
}
