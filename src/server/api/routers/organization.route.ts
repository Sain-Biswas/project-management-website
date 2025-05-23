import { activeOrganizationSchema } from "@/server/database/schema/active-organization.schema";
import { organizationMemberSchema } from "@/server/database/schema/organization-member.schema";
import { organizationSchema } from "@/server/database/schema/organization.schema";
import { organizationInsetValidator } from "@/validator/organization.validator";
import { and, eq, ne } from "drizzle-orm";
import z from "zod/v4";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationRoute = createTRPCRouter({
  newOrganization: protectedProcedure
    .input(organizationInsetValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.database.transaction(async (trx) => {
        const organizationId = await trx
          .insert(organizationSchema)
          .values(input)
          .returning({ id: organizationSchema.id });
        await trx.insert(organizationMemberSchema).values({
          organizationId: organizationId[0]?.id ?? "",
          userId: ctx.session.user.id,
          role: "owner"
        });
      });
    }),

  changeActiveOrganization: protectedProcedure
    .input(z.object({ organizationId: z.uuidv4() }))
    .mutation(async ({ ctx, input }) => {
      const { organizationId } = input;

      const currentState = await ctx.database
        .select()
        .from(activeOrganizationSchema)
        .where(eq(activeOrganizationSchema.userId, ctx.session.user.id));

      const isPresent = currentState.length > 0;

      if (!!!isPresent) {
        await ctx.database
          .insert(activeOrganizationSchema)
          .values({ userId: ctx.session.user.id, organizationId });
      } else {
        await ctx.database
          .update(activeOrganizationSchema)
          .set({ organizationId })
          .where(eq(activeOrganizationSchema.userId, ctx.session.user.id));
      }
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
    const activeOrganizationId =
      await ctx.database.query.activeOrganizationSchema.findFirst({
        where: eq(activeOrganizationSchema.userId, ctx.session.user.id)
      });

    const allOrganizations =
      await ctx.database.query.organizationMemberSchema.findMany({
        where: and(
          eq(organizationMemberSchema.userId, ctx.session.user.id),
          ne(
            organizationMemberSchema.organizationId,
            activeOrganizationId?.organizationId ?? ""
          )
        ),
        with: {
          organization: true
        }
      });

    return allOrganizations.map((organization) => organization.organization);
  }),

  getAllMemberList: protectedProcedure
    .input(z.object({ organizationId: z.uuidv4() }))
    .query(async ({ ctx, input }) => {
      const members =
        await ctx.database.query.organizationMemberSchema.findMany({
          where: eq(
            organizationMemberSchema.organizationId,
            input.organizationId
          ),
          columns: {
            id: true,
            joinedOn: true,
            role: true,
            updatedOn: true
          },
          with: {
            users: {
              columns: {
                email: true,
                image: true,
                name: true
              }
            }
          }
        });

      return members;
    })
});
