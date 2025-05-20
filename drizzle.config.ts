import { type Config } from "drizzle-kit";

import envServer from "@/constants/envServer";

export default {
  out: "./.drizzle/",
  schema: "./src/server/database/schema/index.schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: envServer.DATABASE_URL,
    authToken: envServer.DATABASE_AUTH_TOKEN
  }
} satisfies Config;
