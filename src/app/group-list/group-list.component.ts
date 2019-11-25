import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService} from '../imazsak.service';
import {JoinToGroupDialogComponent} from '../join-to-group/join-to-group-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {

  groups: GroupListData[] = [];
  groupIds: string[] = [];

  constructor(public dialog: MatDialog, public imazsak: ImazsakService) {
  }

  ngOnInit() {
    this.imazsak.listGroups().subscribe(groups => {
      this.groups = groups;
      this.groupIds = this.groups.map(g => g.id);
    });
  }

  openJoinDialog(): void {
    const dialogRef = this.dialog.open(JoinToGroupDialogComponent);

    dialogRef.afterClosed().subscribe(code => {
      if (!!code) {
        // TODO
      }
    });
  }

}
