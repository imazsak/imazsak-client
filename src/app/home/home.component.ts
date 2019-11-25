import {Component, OnInit} from '@angular/core';
import {GroupListData, ImazsakService} from '../imazsak.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CreatePrayerDialogComponent} from '../create-prayer/create-prayer-dialog.component';
import {PrayDialogComponent} from '../pray-dialog/pray-dialog.component';
import {map} from 'rxjs/operators';
import {SettingsDialogComponent} from '../settings/settings-dialog.component';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  groups: GroupListData[] = [];
  groupIds: string[] = [];
  name = '';

  constructor(public dialog: MatDialog, public imazsak: ImazsakService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadGroups();
    this.loadMe();
  }

  private loadGroups() {
    this.imazsak.listGroups().subscribe(groups => {
      this.groups = groups;
      this.groupIds = this.groups.map(g => g.id);
    });
  }

  private loadMe() {
    this.imazsak.getMe().pipe(map(data => {
      this.name = data.name;
    })).subscribe();
  }

  openCreatePrayerDialog(): void {
    if (this.groups.length === 0) {
      this.snackBar.open('Sajnos amíg nem vagy tagja egy közösségnek sem, addig nem tudsz imát kérni.', null, {duration: 3000});
    } else {
      const dialogRef = this.dialog.open(CreatePrayerDialogComponent, {
        data: {groups: this.groups}
      });

      dialogRef.afterClosed().subscribe(data => {
        if (!!data) {
          this.imazsak.createPrayer(data).subscribe();
        }
      });
    }
  }

  openPrayDialog() {
    if (this.groups.length === 0) {
      this.snackBar.open('Sajnos még egy imakérés sincs a közösségeidben.', null, {duration: 3000});
    } else {
      this.dialog.open(PrayDialogComponent, {
        data: {groupIds: this.groupIds}
      });
    }
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(name => {
      if (!!name) {
        this.name = name;
        this.imazsak.saveMe({name}).subscribe();
      }
    });
  }
}
