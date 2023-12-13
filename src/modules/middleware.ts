import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Redis } from "../utils";
import { db } from "../db";

const middleware = fp(async (fastify: FastifyInstance, _options: unknown) => {
  fastify.addHook("onRequest", async (request) => {
    request.redis = Redis;
    request.db = db;
  });
});

export { middleware };
