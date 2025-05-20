import { usersSchema } from "@/server/database/schema/users.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionSchema = pgTable("SESSION", {
  id: text("ID").primaryKey(),
  expiresAt: timestamp("EXPIRES_AT").notNull(),
  token: text("TOKEN").notNull().unique(),
  createdAt: timestamp("CREATED_AT").notNull(),
  updatedAt: timestamp("UPDATED_AT").notNull(),
  ipAddress: text("IP_ADDRESS"),
  userAgent: text("USER_AGENT"),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" })
});
