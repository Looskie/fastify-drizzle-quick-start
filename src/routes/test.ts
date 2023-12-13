import type { FastifyInstance } from "fastify";

export const testRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    const visits = Number(await request.redis.get("visits"));

    request.redis.incr("visits");
    response.send({
      hello: "world",
      visits,
    });
  });

  done();
};
