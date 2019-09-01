import {Component, OnInit} from '@angular/core';
import {GroupListData, GroupMemberListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PrayDialogComponent} from '../pray-dialog/pray-dialog.component';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html'
})
export class PrayersComponent implements OnInit {
  groupId: string;

  group: GroupListData = {id: '', name: ''};
  prayers: GroupPrayerListData[] = [];
  members: GroupMemberListData[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.imazsak.listGroups().subscribe(groups => {
      this.group = groups.find(e => e.id === this.groupId);
    });
    this.loadPrayers();
    this.imazsak.listGroupMembers(this.groupId).subscribe(members => this.members = members);
  }

  loadPrayers() {
    this.imazsak.listGroupPrayers(this.groupId).subscribe(prayers => this.prayers = prayers);
  }

  openPrayDialog(prayer: GroupPrayerListData) {
    this.dialog.open(PrayDialogComponent, {
      data: {prayer, groupId: this.groupId}
    });
  }
}
