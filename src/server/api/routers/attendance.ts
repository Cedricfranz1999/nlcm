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
        attendaceId: z.number(),
        memberId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.attendanceMembers.createMany({
        data: {
          memberId: input.memberId,
          attendanceId: input.attendaceId,
        },
      });
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
