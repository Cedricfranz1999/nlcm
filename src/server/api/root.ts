import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { membersRouter } from "./routers/members";
import { attendanceRouter } from "./routers/attendance";
import { trainingRouter } from "./routers/training";
import { dashboardRouter } from "./routers/dashboard";
import { reportsRouter } from "./routers/reports";
import { loginRouter } from "./routers/login";
import { settingsRouter } from "./routers/settings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  members: membersRouter,
  attendance: attendanceRouter,
  training: trainingRouter,
  dashboard: dashboardRouter,
  reports: reportsRouter,
  login: loginRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
