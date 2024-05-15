import { Component, Inject } from '@angular/core';
import { SkillInfo } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrl: './add-skill-modal.component.css'
})
export class AddSkillModalComponent {
  msg: string = ''
  skill: SkillInfo = {
    skillName: "",
    rate: 0,
  }
  constructor(
    public dialogRef: MatDialogRef<AddSkillModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit(){
  }

  submit(){
    this.dialogRef.close(this.skill);
  }
}
