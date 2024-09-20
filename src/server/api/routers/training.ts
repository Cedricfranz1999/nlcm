import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const trainingRouter = createTRPCRouter({
  getAllTrainingList: publicProcedure.query(({ ctx, input }) => {
    return ctx.db.training.findMany({
      select: {
        id: true,
        trainingName: true,
        date: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  }),

  getTrainingSpecificName: publicProcedure
    .input(
      z.object({
        attendanceId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.training.findFirst({
        where: {
          id: input.attendanceId,
        },
        select: {
          trainingName: true,
        },
      });
    }),

  getTraineeMemberInSelectedTraining: publicProcedure
    .input(
      z.object({
        attendanceId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.trainingMembers.findMany({
        where: {
          trainingId: input.attendanceId,
        },
        select: {
          status: true,
          member: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      });
    }),

  addTraining: publicProcedure
    .input(
      z.object({
        name: z.string(),
        attendaceDate: z.date(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.training.create({
        data: {
          trainingName: input.name,
          date: input.attendaceDate,
        },
      });
    }),

  updateStatusofTrainee: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.trainingMembers.update({
        where: {
          id: input.id,
        },
        data: {
          status: "GRADUATE",
        },
      });
    }),

  addMembersInTraining: publicProcedure
    .input(
      z.object({
        data: z.array(
          z.object({
            memberId: z.number(),
            trainingId: z.number(),
          }),
        ),
        attendanceId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validData = input.data.filter(
        (item) => item.memberId && item.trainingId,
      );

      const attendanceIds = [
        ...new Set(validData.map((item) => item.trainingId)),
      ];

      const existingEntries = await ctx.db.trainingMembers.findMany({
        where: {
          trainingId: { in: attendanceIds },
        },
      });

      const allEntries = await ctx.db.trainingMembers.findMany({
        where: {
          trainingId: input.attendanceId,
        },
      });

      if (validData.length === 0) {
        // Extract the attendanceIds from all entries
        const attendanceIdsToDelete = allEntries.map(
          (entry) => entry.trainingId,
        );

        // Delete all entries matching the attendanceId
        await ctx.db.trainingMembers.deleteMany({
          where: {
            trainingId: { in: attendanceIdsToDelete },
          },
        });

        return {
          message: "All entries deleted because no IDs were provided",
          insertedCount: 0,
          deletedCount: allEntries.length,
        };
      }

      // Create sets for comparison
      const inputPairs = new Set(
        validData.map((item) => `${item.memberId}-${item.trainingId}`),
      );

      const existingPairs = new Set(
        existingEntries.map((entry) => `${entry.memberId}-${entry.trainingId}`),
      );

      // Find new entries to add
      const newEntries = validData.filter(
        (item) => !existingPairs.has(`${item.memberId}-${item.trainingId}`),
      );

      // Add new entries if any
      if (newEntries.length > 0) {
        await ctx.db.trainingMembers.createMany({
          data: newEntries,
        });
      }

      // Find entries to delete (those not in the input)
      const entriesToDelete = existingEntries.filter(
        (entry) => !inputPairs.has(`${entry.memberId}-${entry.trainingId}`),
      );

      // Delete entries if any
      if (entriesToDelete.length > 0) {
        await ctx.db.attendanceMembers.deleteMany({
          where: {
            OR: entriesToDelete.map((entry) => ({
              memberId: entry.memberId,
              trainingId: entry.trainingId,
            })),
          },
        });
      }

      return {
        message: "Processed successfully",
        insertedCount: newEntries.length,
        deletedCount: entriesToDelete.length,
      };
    }),

  getAllmembers: publicProcedure.query(({ ctx, input }) => {
    z;
    return ctx.db.members.findMany({
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
      },
    });
  }),
});
