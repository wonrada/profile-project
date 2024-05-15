import { AddEducationModalComponent } from './../../modals/add-education-modal/add-education-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { MainService } from '../../services/main.service';
import { ContactInfo, EducationInfo, GuildInfo, InterestInfo, JobExperienceInfo, SkillInfo, User, UserInfo } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { AddExperienceModalComponent } from '../../modals/add-experience-modal/add-experience-modal.component';
import { AddSkillModalComponent } from '../../modals/add-skill-modal/add-skill-modal.component';
import { AddOtherModalComponent } from '../../modals/add-other-modal/add-other-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('profileImage') profileImage!: ElementRef;
  @ViewChild('coverImage') coverImage!: ElementRef;
  progressWidth: string = '70%';
  userInfoForm!: FormGroup;
  private unsubscribe = new Subject<void>()

  userData!: any;

  profileImgUrl: string = './assets/images/jk.jpg'
  coverImgUrl: string = './assets/images/cover-bts.jpg'

  educationInfo: any = [];
  experienceInfo: any = [];
  skillInfo: any = [];
  interestInfo:any =[];
  guildInfo:any = [];

  constructor(private fb: FormBuilder, private mainService: MainService, public dialog: MatDialog) {}

  initForm(){
    this.userInfoForm = this.fb.group({
      username: '',
      nickname: '',
      firstName: '',
      lastName: '',
      position: '',
      nationality: '',
      phoneNumber: '',
      startDate: '',

      address: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
      facebookId: '',
      lineId: '',
      instagram: '',
    })
  }

  ngOnInit() {
    this.initForm()
    this.findAllUser();
  }

  findAllUser(){
    this.mainService.getAllUser().subscribe(
      (res: any) => {
        if (res[0]) {
          this.userData = res[0]
          this.setUser()
          if(this.userData.profileImgUrl){
            this.profileImgUrl = this.userData.profileImgUrl
          }
          if(this.userData.coverImgUrl){
            this.coverImgUrl = this.userData.coverImgUrl
          }
          if(!localStorage.getItem('userId')){
            localStorage.setItem('userId',res[0]._id)
          }
          if(this.userData){
            this.educationInfo = this.userData.educationInfo
            this.experienceInfo = this.userData.jobExperienceInfo
            this.skillInfo = this.userData.skillInfo
            this.interestInfo = this.userData.interestInfo
            this.guildInfo = this.userData.guildInfo
          }
        }
      });
  }

  setUser(){
    this.userInfoForm.get('username')?.setValue(this.userData.userInfo.username)
    this.userInfoForm.get('nickname')?.setValue(this.userData.userInfo.nickname)
    this.userInfoForm.get('firstName')?.setValue(this.userData.userInfo.firstName)
    this.userInfoForm.get('lastName')?.setValue(this.userData.userInfo.lastName)
    this.userInfoForm.get('position')?.setValue(this.userData.userInfo.position)
    this.userInfoForm.get('nationality')?.setValue(this.userData.userInfo.nationality)
    this.userInfoForm.get('phoneNumber')?.setValue(this.userData.userInfo.phoneNumber)

    const dateString = this.userData.userInfo.startDate;
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    this.userInfoForm.get('startDate')?.setValue(formattedDate)

    this.userInfoForm.get('address')?.setValue(this.userData.contactInfo.address)
    this.userInfoForm.get('subDistrict')?.setValue(this.userData.contactInfo.subDistrict)
    this.userInfoForm.get('district')?.setValue(this.userData.contactInfo.district)
    this.userInfoForm.get('province')?.setValue(this.userData.contactInfo.province)
    this.userInfoForm.get('postalCode')?.setValue(this.userData.contactInfo.postalCode)
    this.userInfoForm.get('facebookId')?.setValue(this.userData.contactInfo.facebookId)
    this.userInfoForm.get('lineId')?.setValue(this.userData.contactInfo.lineId)
    this.userInfoForm.get('instagram')?.setValue(this.userData.contactInfo.instagram)
  }

  addNewUser() {
    let userId = String(localStorage?.getItem('userId'))
    let userInfoReq: UserInfo = {
      username: this.userInfoForm.get('username')?.value,
      nickname: this.userInfoForm.get('nickname')?.value,
      firstName: this.userInfoForm.get('firstName')?.value,
      lastName: this.userInfoForm.get('lastName')?.value,
      position: this.userInfoForm.get('position')?.value,
      nationality: this.userInfoForm.get('nationality')?.value,
      phoneNumber: this.userInfoForm.get('phoneNumber')?.value,
      startDate: this.userInfoForm.get('startDate')?.value,
    }

    let contactInfoReq: ContactInfo = {
      address: this.userInfoForm.get('address')?.value,
      subDistrict: this.userInfoForm.get('subDistrict')?.value,
      district: this.userInfoForm.get('district')?.value,
      province: this.userInfoForm.get('province')?.value,
      postalCode: this.userInfoForm.get('postalCode')?.value,
      facebookId: this.userInfoForm.get('facebookId')?.value,
      lineId: this.userInfoForm.get('lineId')?.value,
      instagram: this.userInfoForm.get('instagram')?.value,
    }

    let userReq: User = {
      userInfo: userInfoReq,
      contactInfo: contactInfoReq
    }
    if (!this.userData) {
      this.mainService.createUser(userReq).subscribe(
        res=>{
          localStorage.setItem('userId', res._id)
          this.userData = res
          console.log(res);
        }
      )
    } else{
      this.mainService.updateUser(userReq,userId).subscribe()
    }


  }

  profileImgChange(event: any) {
    let userId = String(localStorage?.getItem('userId'))

    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);

    let saveFileInput = new FormData();
      const dbType = String(localStorage.getItem('database'));
      if (selectedFile.length != 0) {
        saveFileInput.append('file', selectedFile);
        this.mainService.uploadProfileImg(saveFileInput,userId).subscribe((res) => {
          this.profileImgUrl = res.profileImgUrl
        });
      }

  }

  coverImgChange(event: any) {

    let userId = String(localStorage?.getItem('userId'))

    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);

    let saveFileInput = new FormData();
      const dbType = String(localStorage.getItem('database'));
      if (selectedFile.length != 0) {
        saveFileInput.append('file', selectedFile);
        this.mainService.uploadCoverImg(saveFileInput,userId).subscribe((res) => {
          this.coverImgUrl = res.coverImgUrl
        });
      }
  }

  addEducation(){
    let userId = String(localStorage?.getItem('userId'))
    const dialogRef = this.dialog.open(AddEducationModalComponent,
      {
        width: '60%',
        data: { message: "ยืนยันการเปลี่ยนรหัสผ่านหรือไม่ ?" },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let educationReq: EducationInfo[] = [
          result
        ]

        let request = {
          educationInfo: educationReq
        }
        this.mainService.updateUser(request,userId).subscribe(
          res=>{
            this.findAllUser()
          }
        )
      }
    });
  }

  addExperience(){
    let userId = String(localStorage?.getItem('userId'))
    const dialogRef = this.dialog.open(AddExperienceModalComponent,
      {
        width: '60%',
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let experienceReq: EducationInfo[] = [
          result
        ]

        let request = {
          jobExperienceInfo: experienceReq
        }
        this.mainService.updateUser(request,userId).subscribe(
          res=>{
            this.findAllUser()
          }
        )
        console.log(result);

      }
    });
  }

  addSkill(){
    let userId = String(localStorage?.getItem('userId'))
    const dialogRef = this.dialog.open(AddSkillModalComponent,
      {
        width: '60%',
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let skillReq: EducationInfo[] = [
          result
        ]

        let request = {
          skillInfo: skillReq
        }
        this.mainService.updateUser(request,userId).subscribe(
          res=>{
            this.findAllUser()
          }
        )
        console.log(result);

      }
    });
  }

  addInterest(){
    let userId = String(localStorage?.getItem('userId'))
    const dialogRef = this.dialog.open(AddOtherModalComponent,
      {
        width: '40%',
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherData  ={
          interestName: result.name
        }
        let interestReq: InterestInfo[] = [
          otherData
        ]

        let request = {
          interestInfo: interestReq
        }
        this.mainService.updateUser(request,userId).subscribe(
          res=>{
            this.findAllUser()
          }
        )
      }
    });
  }

  addGuild(){
    let userId = String(localStorage?.getItem('userId'))
    const dialogRef = this.dialog.open(AddOtherModalComponent,
      {
        width: '40%',
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let otherData  ={
          guildName: result.name
        }
        let guildReq: GuildInfo[] = [
          otherData
        ]

        let request = {
          guildInfo: guildReq
        }
        this.mainService.updateUser(request,userId).subscribe(
          res=>{
            this.findAllUser()
          }
        )
      }
    });
  }

  educationDel(id: string){
    let formToDel = {
      id: id,
      field: "education"
    }
    this.delInfo(formToDel)
  }
  experienceDel(id: string){
    let formToDel = {
      id: id,
      field: "experience"
    }
    this.delInfo(formToDel)
  }
  skillDel(id:string){
    let formToDel = {
      id: id,
      field: "skill"
    }
    this.delInfo(formToDel)
  }
  interestDel(id:string){
    let formToDel = {
      id: id,
      field: "interest"
    }
    this.delInfo(formToDel)
  }
  guildDel(id:string){
    let formToDel = {
      id: id,
      field: "guild"
    }
    this.delInfo(formToDel)
  }

  delInfo(delForm: any){
    let userId = String(localStorage?.getItem('userId'))
    this.mainService.deletInfo(delForm,userId).subscribe(
      res=>{
        this.findAllUser()
      }
    )
  }
  ngOnDestroy() {
    this.unsubscribe.next()
  }
}
