import { usersSchema } from "@/server/database/schema/users.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Schema for Authentication Session for the application user activity.
 */
export const sessionSchema = sqliteTable("SESSION", {
  id: text("ID").primaryKey(),
  expiresAt: integer("EXPIRES_AT", { mode: "timestamp" }).notNull(),
  token: text("TOKEN").notNull().unique(),
  createdAt: integer("CREATED_AT", { mode: "timestamp" }).notNull(),
  updatedAt: integer("UPDATED_AT", { mode: "timestamp" }).notNull(),
  ipAddress: text("IP_ADDRESS"),
  userAgent: text("USER_AGENT"),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" })
});
