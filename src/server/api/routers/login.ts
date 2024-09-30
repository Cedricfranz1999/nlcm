import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";

export const loginRouter = createTRPCRouter({
  loginUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Retrieve user from database
      const user = await ctx.db.admin.findUnique({
        where: { username: input.username },
      });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.password,
      );


      if (input.password === user.password) {
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    }),
});
