import { z } from "zod";
import "dotenv/config";

const env_schema = z.object({
  DATABASE_URL: z.string().default("postgres://user:password@127.0.0.1:5432/postgres"),
  REDIS_URL: z.string().default("redis://127.0.0.1:6379/"),
  PORT: z.number().default(8080),
  HOST: z.string().default("127.0.0.1"),
});

export const env = env_schema.parse(process.env);
