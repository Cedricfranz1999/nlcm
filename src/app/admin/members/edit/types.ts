export interface JobExperience {
  description: string;
}

export interface ChildInfo {
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface FormFilledUpBy {
  id: number;
  formFilledUpBy: string;
  dateFilledUp: string;
  idNo: string;
  verified: string;
  noted: string;
  encoded: string;
  memberId: number;
}

export interface PersonInfo {
  id: number;
  image: string | null;
  lastName: string;
  firstName: string;
  middleName: string;
  fatherLastName: string;
  fatherFirstName: string;
  fatherMiddleName: string;
  motherLastName: string;
  motherFirstName: string;
  motherMiddleName: string;
  dateofBirth: string; // ISO string format
  placeOfbirth: string;
  sex: string;
  height: string;
  weight: string;
  presentAddress: string | null;
  occupation: string;
  maritalStatus: string;
  bloodType: string;
  jobExperience: JobExperience[];
  cellphoneNumber: string;
  homeTelephoneNumber: string;
  email: string;
  educationalAttainment: string;
  spouseLastName: string;
  spouseFirstName: string;
  spouseMiddleName: string;
  nameOfChildrenAndAge: ChildInfo[];
  birthOrder: string | null;
  citizenship: string;
  previousReligion: string;
  dateAcceptedTheLord: string; // ISO string format
  personLedYouToTheLord: string;
  firstDayOfChurchAttendance: string; // ISO string format
  dateWaterBaptized: string; // ISO string format
  dateSpiritBaptized: string; // ISO string format
  formFilledUpBy: FormFilledUpBy;
}
