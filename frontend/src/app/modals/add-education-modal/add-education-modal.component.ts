import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EducationInfo } from '../../models';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrl: './add-education-modal.component.css'
})
export class AddEducationModalComponent {
  msg: string = ''
  educationForm: EducationInfo = {
    startYear: "",
    schoolName: "",
    educationLevel: ""
  }
  constructor(
    public dialogRef: MatDialogRef<AddEducationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(){
    this.msg = this.data.message;
  }

  submit(){
    this.dialogRef.close(this.educationForm);
  }
}
