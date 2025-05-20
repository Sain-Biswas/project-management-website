import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verificationSchema = pgTable("VERIFICATION", {
  id: text("ID").primaryKey(),
  identifier: text("IDENTIFIER").notNull(),
  value: text("VALUE").notNull(),
  expiresAt: timestamp("EXPIRES_AT").notNull(),
  createdAt: timestamp("CREATED_AT").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("UPDATED_AT").$defaultFn(
    () => /* @__PURE__ */ new Date()
  )
});
