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
});
