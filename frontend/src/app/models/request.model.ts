export interface UserInfo {
  username: string;
  nickname: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  phoneNumber: string;
  startDate: Date;
}

export interface ContactInfo {
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  facebookId: string;
  lineId: string;
  instagram: string;
}

export interface EducationInfo {
  startYear: string;
  schoolName: string;
  educationLevel: string;
}

export interface JobExperienceInfo {
  startDate: string;
  endDate: string;
  companyName: string;
  role: string;
}

export interface SkillInfo {
  skillName: string;
  rate: Number;
}

export interface InterestInfo {
  interestName: string;
}

export interface GuildInfo {
  guildName: string;
}

export interface User {
  userInfo: UserInfo;
  contactInfo: ContactInfo;
}
