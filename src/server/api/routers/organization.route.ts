import { activeOrganizationSchema } from "@/server/database/schema/active-organization.schema";
import { organizationMemberSchema } from "@/server/database/schema/organization-member.schema";
import { organizationSchema } from "@/server/database/schema/organization.schema";
import { organizationInsetValidator } from "@/validator/organization.validator";
import { and, eq, ne } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationRoute = createTRPCRouter({
  newOrganization: protectedProcedure
    .input(organizationInsetValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.database.insert(organizationSchema).values(input);
    }),

  activeOrganization: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.database.query.activeOrganizationSchema.findFirst({
      where: eq(activeOrganizationSchema.userId, ctx.session.user.id),
      with: {
        organization: true
      }
    });

    return data?.organization ?? null;
  }),

  getOrganizationList: protectedProcedure.query(async ({ ctx }) => {
    const activeOrganizationId = await ctx.database
      .select()
      .from(activeOrganizationSchema)
      .where(eq(activeOrganizationSchema.userId, ctx.session.user.id));

    const allOrganizations =
      await ctx.database.query.organizationMemberSchema.findMany({
        where: and(
          eq(organizationMemberSchema.userId, ctx.session.user.id),
          ne(
            organizationMemberSchema.organizationId,
            activeOrganizationId[0]?.id ?? ""
          )
        ),
        with: {
          organization: true
        }
      });

    return allOrganizations.map((organization) => organization.organization);
  })
});
