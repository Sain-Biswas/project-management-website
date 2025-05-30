import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

/**
 * Server only environment variables.
 *
 * Only accessible from server side.
 */
const envServer = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.url().or(z.string().refine((v) => v === "file:local.db")),
    DATABASE_AUTH_TOKEN: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development")
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env["DATABASE_URL"],
    DATABASE_AUTH_TOKEN: process.env["DATABASE_AUTH_TOKEN"],
    NODE_ENV: process.env.NODE_ENV
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});

export default envServer;
