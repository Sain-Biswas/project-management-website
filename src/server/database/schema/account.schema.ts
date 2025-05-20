import { usersSchema } from "@/server/database/schema/users.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Schema for Authentication Accounts for the application.
 */
export const accountSchema = sqliteTable("ACCOUNT", {
  id: text("ID").primaryKey(),
  accountId: text("ACCOUNT_ID").notNull(),
  providerId: text("PROVIDER_ID").notNull(),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  accessToken: text("ACCESS_TOKEN"),
  refreshToken: text("REFRESH_TOKEN"),
  idToken: text("ID_TOKEN"),
  accessTokenExpiresAt: integer("ACCESS_TOKEN_EXPIRES_AT", {
    mode: "timestamp"
  }),
  refreshTokenExpiresAt: integer("REFRESH_TOKEN_EXPIRES_AT", {
    mode: "timestamp"
  }),
  scope: text("SCOPE"),
  password: text("PASSWORD"),
  createdAt: integer("CREATED_AT", { mode: "timestamp" }).notNull(),
  updatedAt: integer("UPDATED_AT", { mode: "timestamp" }).notNull()
});
