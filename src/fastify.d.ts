import type { db } from "./db";
import type { Redis } from "./utils";

declare module "fastify" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyRequest {
    db: typeof db;
    redis: typeof Redis;
  }
}
