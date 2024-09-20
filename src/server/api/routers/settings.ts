import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getAdminData: publicProcedure
    // .input(
    //   z.object({
    //     workspaceId: z.string().nullable(),
    //   }),
    // )
    .query(({ ctx, input }) => {
      return ctx.db.admin.findFirst();
    }),
  addAttendance: publicProcedure
    .input(
      z.object({
        id: z.number(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.admin.update({
        where: {
          id: 1,
        },
        data: {
          username: input.username,
          password: input.password,
        },
      });
    }),
});
