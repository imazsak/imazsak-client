import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FeedbackDialogComponent} from './feedback-dialog.component';
import {ImazsakService} from '../imazsak.service';


@Component({
  selector: 'app-feedback-button',
  templateUrl: 'feedback-button.component.html'
})
export class FeedbackButtonComponent implements OnInit {

  constructor(public dialog: MatDialog, private imazsak: ImazsakService) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent);

    dialogRef.afterClosed().subscribe(message => {
      if (!!message) {
        this.imazsak.createFeedback({message}).subscribe();
      }
    });
  }

}
