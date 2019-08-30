import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService} from '../imazsak.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  group: GroupListData;
  // todo members

  constructor(private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.imazsak.listGroups().subscribe(groups => {
      this.group = groups.find(e => e.id === id);
    });
  }
}
