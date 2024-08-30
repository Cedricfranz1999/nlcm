import { z } from "zod";

const childSchema = z.object({
  firstName: z.string().optional(),

  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const jobSchema = z.object({
  experience: z.string().optional(),
});
export const addFormschema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(2, {
    message: " must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateofBirth: z.date(),
  placeOfbirth: z.string().optional().nullish(),
  presentAddress: z.string().optional().nullish(),

  sex: z.string().min(1, {
    message: "required",
  }),
  weight: z.string().optional().nullish(),
  height: z.string().optional().nullish(),
  bloodType: z.string().optional().nullish(),
  maritalStatus: z.string().min(1, {
    message: "required",
  }),
  citizenship: z.string().optional().nullish(),
  cellphoneNumber: z.string().optional().nullish(),
  homeTelephoneNumber: z.string().optional().nullish(),
  email: z.string().optional().nullish(),
  educationalAttainment: z.string().min(1, {
    message: "required",
  }),
  occupation: z.string().optional().nullish(),
  fatherFirstName: z.string().optional().nullish(),
  fatherMiddleName: z.string().optional().nullish(),
  fatherLastName: z.string().optional().nullish(),
  motherFirstName: z.string().optional().nullish(),
  motherMiddleName: z.string().optional().nullish(),
  motherLastName: z.string().optional().nullish(),
  spouseFirstName: z.string().optional().nullish(),
  spouseMiddleName: z.string().optional().nullish(),
  spouseLastName: z.string().optional().nullish(),
  nameOfChildrenAndAge: z.array(childSchema).optional(),
  jobExperience: z.array(jobSchema).optional(),
  previousReligion: z.string().optional().nullish(),
  personLedYouToTheLord: z.string().optional().nullish(),
  dateAcceptedTheLord: z.date().optional().nullish(),
  firstDayOfChurchAttendance: z.date().optional().nullish(),
  dateWaterBaptized: z.date().optional().nullish(),
  dateSpiritBaptized: z.date().optional().nullish(),
  formFilledUpByWho: z.string().optional().nullish(),
  dateFilledUp: z.date().optional().nullish(),
  verified: z.string().optional().nullish(),
  noted: z.string().optional().nullish(),
  encoded: z.string().optional().nullish(),
});
