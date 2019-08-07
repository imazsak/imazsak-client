import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from './settings-dialog.component';
import {ImazsakService} from '../imazsak.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html'
})
export class SettingsButtonComponent implements OnInit {
  name = '';

  constructor(public dialog: MatDialog, private imazsak: ImazsakService) {
  }

  ngOnInit(): void {
    this.imazsak.getMe().pipe(map(data => {
      if (!data.name) {
        this.openDialog();
      } else {
        this.name = data.name;
      }
    })).subscribe();
  }

  openDialog(): void {
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
