import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PrayDialogComponent} from '../pray-dialog/pray-dialog.component';

@Component({
  selector: 'app-pray-button',
  templateUrl: './pray-button.component.html'
})
export class PrayButtonComponent {

  @Input() groupIds: string[];

  constructor(public dialog: MatDialog) {
  }

  openPrayDialog() {
    this.dialog.open(PrayDialogComponent, {
      data: {groupIds: this.groupIds}
    });
  }

}
