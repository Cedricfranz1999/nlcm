import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { subMonths, isAfter, isBefore } from "date-fns";

export const dashboardRouter = createTRPCRouter({
  getDashboardData: publicProcedure.query(async ({ ctx }) => {
    const allMembersCount = await ctx.db.members.count();
    const allTraineeCount = await ctx.db.trainingMembers.count();
    const allMembersWithoutSpiritBaptized = await ctx.db.members.count({
      where: {
        dateSpiritBaptized: null,
      },
    });
    const allMembersWithoutWaterBaptized = await ctx.db.members.count({
      where: {
        dateWaterBaptized: null,
      },
    });
    const allTrainingSession = await ctx.db.training.count();
    const oneMonthAgo = subMonths(new Date(), 1);

    const memberWithoutAttendanceForOneMonth = await ctx.db.members.count({
      where: {
        attendance: {
          none: {
            attendance: {
              date: {
                gte: oneMonthAgo.toISOString(),
              },
            },
          },
        },
      },
    });

    return [
      {
        count: allMembersCount,
        title: "All members count",
        path: "dashboard/membersCount",
      },
      {
        count: allTraineeCount,
        title: "All trainee count",
        path: "dashboard/traineeCount",
      },
      {
        count: allMembersWithoutSpiritBaptized,
        title: "Members without spirit baptized",
        path: "dashboard/withoutWaterBaptized",
      },
      {
        count: allMembersWithoutWaterBaptized,
        title: "Members without water baptized",
        path: "dashboard/withoutSpiritBaptized",
      },
      {
        count: allTrainingSession,
        title: "Total training session",
        path: "/training",
      },

      {
        count: memberWithoutAttendanceForOneMonth,
        title: "Members without attendance for month",
        path: "dashboard/withoutAttendanceForMonth",
      },
    ];
  }),

  getData: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const oneMonthAgo = subMonths(new Date(), 1);
      const { slug } = input;

      // Fetch all necessary data
      const allMembersCount = await ctx.db.members.findMany({
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      });

      const allTraineeCount = await ctx.db.members.findMany({
        where: {
          training: {
            some: {},
          },
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      });

      const allMembersWithoutSpiritBaptized = await ctx.db.members.findMany({
        where: {
          dateSpiritBaptized: null,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      });

      const allMembersWithoutWaterBaptized = await ctx.db.members.findMany({
        where: {
          dateWaterBaptized: null,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      });

      const allTrainingSession = await ctx.db.members.findMany({
        where: {
          dateWaterBaptized: null,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
        },
      });

      const members = await ctx.db.members.findMany({
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          attendance: {
            select: {
              attendance: {
                select: {
                  date: true,
                },
              },
            },
          },
        },
      });
      const membersWithoutRecentAttendance = members
        .map((member) => {
          const latestAttendance = member.attendance
            .map((att) => new Date(att.attendance.date))
            .sort((a, b) => b.getTime() - a.getTime())[0];

          if (latestAttendance && isBefore(latestAttendance, oneMonthAgo)) {
            return {
              id: true,
              firstName: member.firstName,
              middleName: member.middleName,
              lastName: member.lastName,
              attendance: [
                { attendance: { date: latestAttendance.toISOString() } },
              ],
            };
          }
          return null;
        })
        .filter((member) => member !== null);

      switch (slug) {
        case "membersCount":
          return allMembersCount;
        case "traineeCount":
          return allTraineeCount;
        case "withoutWaterBaptized":
          return allMembersWithoutWaterBaptized;
        case "withoutSpiritBaptized":
          return allMembersWithoutSpiritBaptized;
        case "withoutAttendanceForMonth":
          return membersWithoutRecentAttendance;
        default:
          throw new Error("Invalid slug provided");
      }
    }),
  memberWithoutAttendanceForOneMonth: publicProcedure.query(async ({ ctx }) => {
    const oneMonthAgo = subMonths(new Date(), 1);

    // Fetch members with all their attendance records
    const members = await ctx.db.members.findMany({
      select: {
        firstName: true,
        lastName: true,
        attendance: {
          select: {
            attendance: {
              select: {
                date: true,
              },
            },
          },
        },
      },
    });

    const membersWithoutRecentAttendance = members
      .map((member) => {
        const latestAttendance = member.attendance
          .map((att) => new Date(att.attendance.date))
          .sort((a, b) => b.getTime() - a.getTime())[0];

        if (latestAttendance && isBefore(latestAttendance, oneMonthAgo)) {
          return {
            firstName: member.firstName,
            lastName: member.lastName,
            attendance: [
              { attendance: { date: latestAttendance.toISOString() } },
            ],
          };
        }
        return null;
      })
      .filter((member) => member !== null);

    return membersWithoutRecentAttendance;
  }),
});
