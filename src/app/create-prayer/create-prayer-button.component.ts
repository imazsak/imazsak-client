import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GroupListData, ImazsakService} from '../imazsak.service';
import {CreatePrayerDialogComponent} from './create-prayer-dialog.component';


@Component({
  selector: 'app-create-prayer-button',
  templateUrl: 'create-prayer-button.component.html'
})
export class CreatePrayerButtonComponent {

  @Input() groups: GroupListData[];
  @Output() createdPrayer = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private imazsak: ImazsakService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePrayerDialogComponent, {
      data: {groups: this.groups}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!!data) {
        this.imazsak.createPrayer(data).subscribe(_ => this.createdPrayer.emit({}));
      }
    });
  }

}
