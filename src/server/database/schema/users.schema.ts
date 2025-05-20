import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Schema for Users for the application.
 */
export const usersSchema = pgTable("USERS", {
  id: text("ID")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("NAME").notNull(),
  email: text("EMAIL").unique().notNull(),
  emailVerified: boolean("EMAIL_VERIFIED")
    .notNull()
    .$defaultFn(() => false),
  password: text("PASSWORD"),
  image: text("IMAGE"),
  createdAt: timestamp("CREATED_AT")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("UPDATED_AT")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
});
