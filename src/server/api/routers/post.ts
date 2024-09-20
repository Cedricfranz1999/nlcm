import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const attendanceRouter = createTRPCRouter({
  getAllAttendanceList: publicProcedure.query(({ ctx, input }) => {
    return ctx.db.attendance.findMany({
      select: {
        id: true,
        attendanceName: true,
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

  getAttendanceSpecificDate: publicProcedure
    .input(
      z.object({
        attendanceId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.attendance.findFirst({
        where: {
          id: input.attendanceId,
        },
        select: {
          date: true,
        },
      });
    }),

  getAttendanceMemberInSelectedDate: publicProcedure
    .input(
      z.object({
        attendanceId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.attendanceMembers.findMany({
        where: {
          attendanceId: input.attendanceId,
        },
        select: {
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

  addAttendance: publicProcedure
    .input(
      z.object({
        name: z.string(),
        attendaceDate: z.date(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.attendance.create({
        data: {
          attendanceName: input.name,
          date: input.attendaceDate,
        },
      });
    }),

  addMembersInAttendance: publicProcedure
    .input(
      z.object({
        data: z.array(
          z.object({
            memberId: z.number(),
            attendanceId: z.number(),
          }),
        ),
        attendanceId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validData = input.data.filter(
        (item) => item.memberId && item.attendanceId,
      );

      const attendanceIds = [
        ...new Set(validData.map((item) => item.attendanceId)),
      ];

      const existingEntries = await ctx.db.attendanceMembers.findMany({
        where: {
          attendanceId: { in: attendanceIds },
        },
      });

      const allEntries = await ctx.db.attendanceMembers.findMany({
        where: {
          attendanceId: input.attendanceId,
        },
      });

      if (validData.length === 0) {
        // Extract the attendanceIds from all entries
        const attendanceIdsToDelete = allEntries.map(
          (entry) => entry.attendanceId,
        );

        // Delete all entries matching the attendanceId
        await ctx.db.attendanceMembers.deleteMany({
          where: {
            attendanceId: { in: attendanceIdsToDelete },
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
        validData.map((item) => `${item.memberId}-${item.attendanceId}`),
      );

      const existingPairs = new Set(
        existingEntries.map(
          (entry) => `${entry.memberId}-${entry.attendanceId}`,
        ),
      );

      // Find new entries to add
      const newEntries = validData.filter(
        (item) => !existingPairs.has(`${item.memberId}-${item.attendanceId}`),
      );

      // Add new entries if any
      if (newEntries.length > 0) {
        await ctx.db.attendanceMembers.createMany({
          data: newEntries,
        });
      }

      // Find entries to delete (those not in the input)
      const entriesToDelete = existingEntries.filter(
        (entry) => !inputPairs.has(`${entry.memberId}-${entry.attendanceId}`),
      );

      // Delete entries if any
      if (entriesToDelete.length > 0) {
        await ctx.db.attendanceMembers.deleteMany({
          where: {
            OR: entriesToDelete.map((entry) => ({
              memberId: entry.memberId,
              attendanceId: entry.attendanceId,
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
