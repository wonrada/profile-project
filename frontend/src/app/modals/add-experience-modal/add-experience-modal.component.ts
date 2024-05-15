import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobExperienceInfo } from '../../models';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrl: './add-experience-modal.component.css'
})
export class AddExperienceModalComponent {
  msg: string = ''
  jobExperience: JobExperienceInfo = {
    startDate: "",
    endDate: "",
    companyName: "",
    role: ""
  }
  constructor(
    public dialogRef: MatDialogRef<AddExperienceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(){
  }

  submit(){
    this.dialogRef.close(this.jobExperience);
  }
}
