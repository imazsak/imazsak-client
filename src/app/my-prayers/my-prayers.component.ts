import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService, MyPrayerListData} from '../imazsak.service';

@Component({
  selector: 'app-my-prayers',
  templateUrl: './my-prayers.component.html',
  styleUrls: ['./my-prayers.component.scss']
})
export class MyPrayersComponent implements OnInit {

  groups: GroupListData[] = [];
  groupIds: string[] = [];
  myPrayers: MyPrayerListData[] = [];

  constructor(public imazsak: ImazsakService) {
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

}
