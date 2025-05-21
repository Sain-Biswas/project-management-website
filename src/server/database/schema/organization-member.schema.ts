import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organizationSchema } from "./organization.schema";
import { usersSchema } from "./users.schema";

/**
 * Schema that connects organizations and users -> many to many.
 */
export const organizationMemberSchema = sqliteTable("ORGANIZATION_MEMBER", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationId: text("ORGANIZATION_ID")
    .notNull()
    .references(() => organizationSchema.id, { onDelete: "cascade" }),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, {
      onDelete: "cascade"
    }),
  role: text("ROLE", { enum: ["owner", "admin", "member", "removed"] }),
  joinedOn: integer("JOINED_ON", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedOn: integer("UPDATED_ON", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
});

export const organizationMemberRelation = relations(
  organizationMemberSchema,
  ({ one }) => ({
    organization: one(organizationSchema, {
      fields: [organizationMemberSchema.organizationId],
      references: [organizationSchema.id]
    }),
    users: one(usersSchema, {
      fields: [organizationMemberSchema.userId],
      references: [usersSchema.id]
    })
  })
);
