import * as schema from "@api/db/schemas";
import { env, Logger } from "@api/utils";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

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
    .catch((err) => {
      Logger.error("INIT", `Failed to connect to database ${String(err)}}`);
      process.exit(1);
    });

  db = drizzle(pool);

  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  })
    .then(() => {
      Logger.info("INIT", "Migrated database");
    })
    .catch((err) => {
      Logger.error("INIT", `Failed to migrate database ${String(err)}`);
      process.exit(1);
    });
};
