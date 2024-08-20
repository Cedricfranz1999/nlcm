import { z } from "zod";

const childSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .optional(),
});

const jobSchema = z.object({
  experience: z.string().optional(),
});
export const addFormschema = z.object({
  firstName: z.string().min(2, {
    message: " must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateofBirth: z.date().optional(),
  placeOfbirth: z.string().optional(),
  presentAddress: z.string().optional(),

  sex: z.string().min(1, {
    message: "required",
  }),
  weight: z.string().optional(),
  height: z.string().optional(),
  bloodType: z.string().optional(),
  maritalStatus: z.string().min(1, {
    message: "required",
  }),
  citizenship: z.string().optional(),
  cellphoneNumber: z.string().optional(),
  homeTelephoneNumber: z.string().optional(),
  email: z.string().optional(),
  educationalAttainment: z.string().min(1, {
    message: "required",
  }),
  occupation: z.string().optional(),
  fatherFirstName: z.string().optional(),
  fatherMiddleName: z.string().optional(),
  fatherLastName: z.string().optional(),
  motherFirstName: z.string().optional(),
  motherMiddleName: z.string().optional(),
  motherLastName: z.string().optional(),
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  nameOfChildrenAndAge: z.array(childSchema).optional(),
  jobExperience: z.array(jobSchema).optional(),
  previousReligion: z.string().optional(),
  personLedYouToTheLord: z.string().optional(),
  dateAcceptedTheLord: z.date().optional(),
  firstDayOfChurchAttendance: z.date().optional(),
  dateWaterBaptized: z.date().optional(),
  dateSpiritBaptized: z.date().optional(),
  formFilledUpBy: z.string().optional(),
  dateFilledUp: z.date().optional(),
  verified: z.string().optional(),
  noted: z.string().optional(),
  encoded: z.string().optional(),
});
