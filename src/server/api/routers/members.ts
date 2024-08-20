import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const membersRouter = createTRPCRouter({
  getAllmembers: publicProcedure
    // .input(
    //   z.object({
    //     workspaceId: z.string().nullable(),
    //   }),
    // )
    .query(({ ctx, input }) => {
      return ctx.db.members.findMany();
    }),

  getAllmembersById: publicProcedure
    .input(
      z.object({
        userId: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.members.findFirst({
        where: {
          id: input.userId,
        },
        include: {
          formFilledUpBy: true,
        },
      });
    }),

  addMember: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(2, {
          message: "First name must be at least 2 characters.",
        }),
        middleName: z.string().optional(),
        lastName: z.string().min(2, {
          message: "Last name must be at least 2 characters.",
        }),
        dateofBirth: z.date().optional(),
        placeOfbirth: z.string().optional(),
        sex: z.string().min(1, {
          message: "Sex is required.",
        }),
        weight: z.string().optional(),
        height: z.string().optional(),
        bloodType: z.string().optional(),
        maritalStatus: z.string().min(1, {
          message: "Marital status is required.",
        }),
        citizenship: z.string().min(1, {
          message: "Citizenship is required.",
        }),
        cellphoneNumber: z.string().optional(),
        homeTelephoneNumber: z.string().optional(),
        email: z.string().optional(),
        educationalAttainment: z.string().optional(),
        occupation: z.string().min(1, {
          message: "Occupation is required.",
        }),
        fatherFirstName: z.string().optional(),
        fatherMiddleName: z.string().optional(),
        fatherLastName: z.string().optional(),
        motherFirstName: z.string().optional(),
        motherMiddleName: z.string().optional(),
        motherLastName: z.string().optional(),
        spouseFirstName: z.string().optional(),
        spouseMiddleName: z.string().optional(),
        spouseLastName: z.string().optional(),
        nameOfChildrenAndAge: z
          .array(
            z.object({
              firstName: z.string().min(2).optional(),
              middleName: z.string().optional(),
              lastName: z.string().min(2).optional(),
            }),
          )
          .optional(),
        jobExperience: z
          .array(
            z.object({
              description: z.string().optional(),
            }),
          )
          .optional(),
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
      }),
    )
    .mutation(({ ctx, input }) => {
      const payload: any = {
        ...input,
        dateofBirth: input.dateofBirth ?? undefined,
        placeOfbirth: input.placeOfbirth ?? undefined,
      };

      return ctx.db.members
        .create({
          data: payload,
        })
        .then((data) => {
          return ctx.db.formFilledUpBy.create({
            data: {
              formFilledUpBy: input.formFilledUpBy,
              dateFilledUp: input.dateFilledUp,
              verified: input.verified,
              noted: input.noted,
              encoded: input.encoded,
              memberId: data.id,
            },
          });
        });
    }),
});
