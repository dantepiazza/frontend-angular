import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
  action: () => void;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './ui-dialog.component.html',
  styleUrls: ['./ui-dialog.component.css']
})
export class UiDialogComponent implements OnInit {
  /*public data: any = ;*/
  
  constructor(
    public dialogRef: MatDialogRef<UiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      message: string,
      buttonCancelText: string,
      buttonConfirmText: string,
      action: Function,
    }
  ) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    if(this.data.action && {}.toString.call(this.data.action) === '[object Function]'){
      this.data.action();
    }
  }
}
