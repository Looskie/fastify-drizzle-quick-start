import { initDb } from "@api/db";
import { testRoutes } from "@api/routes";
import { env, Logger, Redis } from "@api/utils";
import fastify from "fastify";

const API_VERSION = "v1";

export const main = async () => {
  const server = fastify({
    bodyLimit: 1_000_000,
    trustProxy: true,
  });

  await initDb();
  await Redis.initialize();

  server.register(import("@fastify/cors"), {
    maxAge: 600,
    origin: true,
    credentials: true,
  });

  // Routes
  server.register(testRoutes, {
    prefix: `/${API_VERSION}/test`,
  });

  server.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
    if (err) {
      Logger.error("INIT", err.message);
      process.exit(1);
    }

    Logger.info("INIT", `Server listening at ${address}`);
  });

  return server;
};

main();
