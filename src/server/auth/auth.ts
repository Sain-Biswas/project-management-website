import database from "@/server/database";
import * as schema from "@/server/database/schema/index.schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.usersSchema,
      session: schema.sessionSchema,
      verification: schema.verificationSchema,
      account: schema.accountSchema
    }
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  plugins: [openAPI()]
});

const authServer = auth.api;

export type TSession = typeof auth.$Infer.Session.session;
export type TUser = typeof auth.$Infer.Session.user;

export default authServer;
