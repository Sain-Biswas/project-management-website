import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organizationMemberSchema } from "./organization-member.schema";

/**
 * Schema for storing basic organization data.
 */
export const organizationSchema = sqliteTable("ORGANIZATION", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("NAME").notNull(),
  description: text("DESCRIPTION").notNull(),
  image: text("IMAGE"),
  category: text("CATEGORY", {
    enum: ["enterprise", "startup", "free", "custom"]
  }).notNull(),
  createdAt: integer("CREATED_AT", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("UPDATED_AT", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
});

export const organizationRelation = relations(
  organizationSchema,
  ({ many }) => ({
    members: many(organizationMemberSchema)
  })
);
