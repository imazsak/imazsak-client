import {Component, OnInit} from '@angular/core';
import {GroupListData, GroupMemberListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.scss']
})
export class PrayersComponent implements OnInit {
  groupId: string;

  group: GroupListData = {id: '', name: ''};
  prayers: GroupPrayerListData[] = [];
  members: GroupMemberListData[] = [];

  constructor(private route: ActivatedRoute, private imazsak: ImazsakService) {
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
}
