import { date, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const reportsRouter = createTRPCRouter({
  getReportsByDate: publicProcedure
    .input(
      z.object({
        date: z
          .object({
            from: z.date().optional(),
            to: z.date().optional(),
          })
          .optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const { date } = input;
      return ctx.db.attendance.findMany({
        where: {
          ...(date?.from &&
            date?.to && {
              date: {
                gte: date.from,
                lte: date.to,
              },
            }),
        },
        select: {
          date: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      });
    }),
});
