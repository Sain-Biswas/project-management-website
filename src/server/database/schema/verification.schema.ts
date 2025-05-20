import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Schema for Storing Verification tokens for user request validation.
 */
export const verificationSchema = sqliteTable("VERIFICATION", {
  id: text("ID").primaryKey(),
  identifier: text("IDENTIFIER").notNull(),
  value: text("VALUE").notNull(),
  expiresAt: integer("EXPIRES_AT", { mode: "timestamp" }).notNull(),
  createdAt: integer("CREATED_AT", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("UPDATED_AT", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  )
});
