import { Component, Inject } from '@angular/core';
import { SkillInfo } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-other-modal',
  templateUrl: './add-other-modal.component.html',
  styleUrl: './add-other-modal.component.css'
})
export class AddOtherModalComponent {
  msg: string = ''
  other = {
     name: "",
  }
  constructor(
    public dialogRef: MatDialogRef<AddOtherModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(){
  }

  submit(){
    this.dialogRef.close(this.other);
  }
}
