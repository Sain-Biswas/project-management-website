import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    const { session, user } = ctx.session;

    return { session, user };
  })
});
