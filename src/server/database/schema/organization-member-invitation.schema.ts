import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organizationSchema } from "./organization.schema";
import { usersSchema } from "./users.schema";

export const organizationMemberInvitationSchema = sqliteTable(
  "ORGANIZATION_MEMBER_INVITATION",
  {
    id: text("ID")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    invitedById: text("INVITED_BY")
      .notNull()
      .references(() => usersSchema.id, { onDelete: "cascade" }),
    sentToId: text("SENT_TO")
      .notNull()
      .references(() => usersSchema.id, { onDelete: "cascade" }),
    organizationId: text("ORGANIZATION_ID")
      .notNull()
      .references(() => organizationSchema.id, { onDelete: "cascade" }),
    role: text("ROLE", {
      enum: ["owner", "admin", "member", "removed"]
    }).notNull(),
    status: text("STATUS", {
      enum: ["pending", "accepted", "rejected", "canceled"]
    })
      .notNull()
      .$defaultFn(() => "pending"),
    createdAt: integer("CREATED_AT", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("UPDATED_AT", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date())
  }
);

export const organizationMemberInvitationRelation = relations(
  organizationMemberInvitationSchema,
  ({ one }) => ({
    invitedBy: one(usersSchema, {
      fields: [organizationMemberInvitationSchema.invitedById],
      references: [usersSchema.id]
    }),
    sentTo: one(usersSchema, {
      fields: [organizationMemberInvitationSchema.sentToId],
      references: [usersSchema.id]
    }),
    organization: one(organizationSchema, {
      fields: [organizationMemberInvitationSchema.organizationId],
      references: [organizationSchema.id]
    })
  })
);
