import { activeOrganizationSchema } from "@/server/database/schema/active-organization.schema";
import { organizationMemberInvitationSchema } from "@/server/database/schema/organization-member-invitation.schema";
import { organizationMemberSchema } from "@/server/database/schema/organization-member.schema";
import { organizationSchema } from "@/server/database/schema/organization.schema";
import { usersSchema } from "@/server/database/schema/users.schema";
import {
  organizationInsetValidator,
  organizationMemberAddingValidator
} from "@/validator/organization.validator";
import { TRPCError } from "@trpc/server";
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

  changeMemberRole: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        role: z.enum(["admin", "member"]),
        organizationId: z.uuidv4()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organizationRole = await ctx.database
        .select()
        .from(organizationMemberSchema)
        .where(
          and(
            eq(organizationMemberSchema.organizationId, input.organizationId),
            eq(organizationMemberSchema.userId, ctx.session.user.id)
          )
        );

      if (organizationRole[0]?.role !== "owner") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the owner can change member roles"
        });
      }

      await ctx.database
        .update(organizationMemberSchema)
        .set({ role: input.role })
        .where(
          and(
            eq(organizationMemberSchema.organizationId, input.organizationId),
            eq(organizationMemberSchema.userId, input.memberId)
          )
        );
    }),

  inviteUserToOrganization: protectedProcedure
    .input(organizationMemberAddingValidator)
    .mutation(async ({ ctx, input }) => {
      const { organizationId, role, userEmail } = input;
      const {
        database,
        session: { user }
      } = ctx;

      const [sendUser, invitingUser] = await Promise.all([
        database.query.usersSchema.findFirst({
          where: eq(usersSchema.email, userEmail)
        }),
        database.query.organizationMemberSchema.findFirst({
          where: and(
            eq(organizationMemberSchema.organizationId, organizationId),
            eq(organizationMemberSchema.userId, user.id)
          )
        })
      ]);

      if (!sendUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `No user found with email - ${userEmail}`
        });
      }

      if (!!!invitingUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be a registered user of the same organization."
        });
      }

      if (invitingUser.role === "member" || invitingUser.role === "removed") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only a owner or admin can invite others."
        });
      }

      if (invitingUser.role === "admin" && role === "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin can only invite others as a member."
        });
      }

      await database.insert(organizationMemberInvitationSchema).values({
        organizationId,
        role,
        invitedById: user.id,
        sentToId: sendUser.id,
        status: "pending"
      });

      return sendUser.name;
    }),

  activeOrganization: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.database.query.activeOrganizationSchema.findFirst({
      where: eq(activeOrganizationSchema.userId, ctx.session.user.id),
      with: {
        organization: {
          with: {
            members: {
              with: {
                users: true
              }
            }
          }
        }
      }
    });

    const organizationValue = data?.organization
      ? {
          ...data?.organization,
          owners: data?.organization?.members.filter((i) => i.role === "owner")
        }
      : undefined;

    return organizationValue ?? null;
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
                name: true,
                id: true
              }
            }
          }
        });

      return members;
    }),

  getMemberRole: protectedProcedure.query(async ({ ctx }) => {
    const activeOrganization = await ctx.database
      .select()
      .from(activeOrganizationSchema)
      .where(eq(activeOrganizationSchema.userId, ctx.session.user.id));
    const activeOrganizationId = activeOrganization[0]?.organizationId ?? "";

    console.log(activeOrganizationId);

    const member = await ctx.database
      .select()
      .from(organizationMemberSchema)
      .where(
        and(
          eq(organizationMemberSchema.userId, ctx.session.user.id),
          eq(organizationMemberSchema.organizationId, activeOrganizationId)
        )
      );

    return member[0]?.role ?? null;
  }),

  getInvitationsReceived: protectedProcedure.query(async ({ ctx }) => {
    const {
      database,
      session: { user }
    } = ctx;

    const data =
      await database.query.organizationMemberInvitationSchema.findMany({
        where: eq(organizationMemberInvitationSchema.sentToId, user.id),
        with: {
          invitedBy: true,
          organization: true
        }
      });

    return data ?? null;
  })
});
