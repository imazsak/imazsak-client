import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService, MyPrayerListData} from '../imazsak.service';
import {MatDialog} from '@angular/material';
import {CreatePrayerDialogComponent} from '../create-prayer/create-prayer-dialog.component';
import {ClosePrayerDialogComponent} from '../close-prayer-dialog/close-prayer-dialog.component';

@Component({
  selector: 'app-my-prayers',
  templateUrl: './my-prayers.component.html',
  styleUrls: ['./my-prayers.component.scss']
})
export class MyPrayersComponent implements OnInit {

  groups: GroupListData[] = [];
  groupIds: string[] = [];
  myPrayers: MyPrayerListData[] = [];

  constructor(public dialog: MatDialog, public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listGroups().subscribe(groups => {
      this.groups = groups;
      this.groupIds = this.groups.map(g => g.id);
    });
    this.loadMyPrayers();
  }

  loadMyPrayers() {
    this.imazsak.listMyPrayers().subscribe(myPrayers => this.myPrayers = myPrayers);
  }

  openCloseDialog(id: string) {
    const dialogRef = this.dialog.open(ClosePrayerDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (!!data && data.close) {
        this.imazsak.closePrayer({id, message: data.message}).subscribe(_ => this.loadMyPrayers());
      }
    });
  }

}
