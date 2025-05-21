import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organizationSchema } from "./organization.schema";
import { usersSchema } from "./users.schema";

export const activeOrganizationSchema = sqliteTable("ACTIVE_ORGANIZATION", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  organizationId: text("ORGANIZATION_ID").references(
    () => organizationSchema.id,
    { onDelete: "set null" }
  )
});

export const activeOrganizationRelation = relations(
  activeOrganizationSchema,
  ({ one }) => ({
    organization: one(organizationSchema, {
      fields: [activeOrganizationSchema.organizationId],
      references: [organizationSchema.id]
    })
  })
);
