import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupListData, ImazsakService} from '../imazsak.service';
import {ShowJoinCodeDialogComponent} from '../join-to-group/show-join-code-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  model: GroupListData = {id: '', name: ''};

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private imazsak: ImazsakService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.imazsak.listGroups().subscribe(groups => {
      this.model = groups.find(e => e.id === id);
    });
  }

  openJoinDialog(): void {
    const code = 'TODO'; // TODO
    this.dialog.open(ShowJoinCodeDialogComponent, {data: {code}});
  }
}
