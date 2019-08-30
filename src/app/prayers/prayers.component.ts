import { Component, OnInit } from '@angular/core';
import {GroupListData, GroupPrayerListData, ImazsakService} from '../imazsak.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.scss']
})
export class PrayersComponent implements OnInit {
  group: GroupListData = {id: '', name: ''};
  prayers: GroupPrayerListData[] = [];

  constructor(private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.imazsak.listGroups().subscribe(groups => {
      this.group = groups.find(e => e.id === id);
    });
    this.imazsak.listGroupPrayers(id).subscribe(prayers => this.prayers = prayers);
  }
}
