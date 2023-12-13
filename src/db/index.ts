import * as schema from "@api/db/schemas";
import { env, Logger } from "@api/utils";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

// eslint-disable-next-line import/no-mutable-exports
export let db: ReturnType<typeof drizzle<typeof schema>>;

export const initDb = async () => {
  const pool = await new Pool({
    connectionString: env.DATABASE_URL,
  })
    .connect()
    .then((client) => {
      Logger.info("INIT", "Connected to database");

      return client;
    })
    .catch((error) => {
      Logger.error("INIT", `Failed to connect to database ${String(error)}}`);
      throw new Error(`Failed to connect to database ${String(error)}`);
    });

  db = drizzle(pool, {
    schema,
  });

  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  })
    .then(() => {
      Logger.info("INIT", "Migrated database");
    })
    .catch((error) => {
      Logger.error("INIT", `Failed to migrate database ${String(error)}`);
      throw new Error(`Failed to migrate database ${String(error)}`);
    });
};
