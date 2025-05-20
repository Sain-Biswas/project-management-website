import {
  neon,
  neonConfig,
  type NeonQueryFunction
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import envServer from "@/constants/envServer";
import * as schema from "@/server/database/schema/index.schema";

/**
 * Setup websocket
 */
import ws from "ws";
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: NeonQueryFunction<false, false> | undefined;
};

const client = globalForDb.conn ?? neon(envServer.DATABASE_URL);
if (envServer.NODE_ENV !== "production") globalForDb.conn = client;

/**
 * Drizzle database client for interacting with the neon postgres database.
 *
 * This is used throughout the codebase to fire CRUD operations and modifying content on the database.
 */
const database = drizzle({ client, schema });

export default database;
