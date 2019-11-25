import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService} from '../imazsak.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {

  groups: GroupListData[] = [];
  groupIds: string[] = [];

  constructor(public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listGroups().subscribe(groups => {
      this.groups = groups;
      this.groupIds = this.groups.map(g => g.id);
    });
  }

}
