import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organizationMemberSchema } from "./organization-member.schema";

/**
 * Schema for Users for the application.
 */
export const usersSchema = sqliteTable("USERS", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("NAME").notNull(),
  email: text("EMAIL").unique().notNull(),
  emailVerified: integer("EMAIL_VERIFIED", { mode: "boolean" })
    .notNull()
    .$defaultFn(() => false),
  password: text("PASSWORD"),
  image: text("IMAGE"),
  createdAt: integer("CREATED_AT", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: integer("UPDATED_AT", { mode: "timestamp" })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const usersRelation = relations(usersSchema, ({ many }) => ({
  organizations: many(organizationMemberSchema)
}));
