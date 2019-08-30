import {Component, OnInit} from '@angular/core';
import {GroupListData, GroupMemberListData, ImazsakService} from '../imazsak.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  group: GroupListData = {id: '', name: ''};
  members: GroupMemberListData[] = [];

  constructor(private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.imazsak.listGroups().subscribe(groups => {
      this.group = groups.find(e => e.id === id);
    });
    this.imazsak.listGroupMembers(id).subscribe(members => this.members = members);
  }
}
