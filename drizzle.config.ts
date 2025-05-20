import { type Config } from "drizzle-kit";

import envServer from "@/constants/envServer";

export default {
  out: "./.drizzle/",
  schema: "./src/server/database/schema/index.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: envServer.DATABASE_URL
  }
} satisfies Config;
