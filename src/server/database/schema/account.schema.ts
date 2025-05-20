import { usersSchema } from "@/server/database/schema/users.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const accountSchema = pgTable("ACCOUNT", {
  id: text("ID").primaryKey(),
  accountId: text("ACCOUNT_ID").notNull(),
  providerId: text("PROVIDER_ID").notNull(),
  userId: text("USER_ID")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  accessToken: text("ACCESS_TOKEN"),
  refreshToken: text("REFRESH_TOKEN"),
  idToken: text("ID_TOKEN"),
  accessTokenExpiresAt: timestamp("ACCESS_TOKEN_EXPIRES_AT"),
  refreshTokenExpiresAt: timestamp("REFRESH_TOKEN_EXPIRES_AT"),
  scope: text("SCOPE"),
  password: text("PASSWORD"),
  createdAt: timestamp("CREATED_AT").notNull(),
  updatedAt: timestamp("UPDATED_AT").notNull()
});
