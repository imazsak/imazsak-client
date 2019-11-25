import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ClipboardService} from 'ngx-clipboard';

export interface DialogData {
  code: string;
}

@Component({
  selector: 'app-show-join-code-dialog',
  templateUrl: 'show-join-code-dialog.component.html',
})
export class ShowJoinCodeDialogComponent {

  constructor(public dialogRef: MatDialogRef<ShowJoinCodeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private clipboardService: ClipboardService,
              private snackBar: MatSnackBar) {
  }

  copy() {
    this.clipboardService.copyFromContent(this.data.code);
    this.snackBar.open('Csatlakozási kód vágolapra másolva!', null, {duration: 3000});
  }

}
