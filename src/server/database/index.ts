import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import envServer from "@/constants/envServer";
import * as schema from "@/server/database/schema/index.schema";

/**
 * Libsql client for accessing sqlite database
 */
const client = createClient({
  url: envServer.DATABASE_URL,
  authToken: envServer.DATABASE_AUTH_TOKEN
});

/**
 * Drizzle database client for interacting with the neon postgres database.
 *
 * This is used throughout the codebase to fire CRUD operations and modifying content on the database.
 */
const database = drizzle({ client, schema });

export default database;
