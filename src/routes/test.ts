import type { FastifyInstance } from "fastify";

export const testRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (_req, res) => {
    res.send({
      hello: "world",
    });
  });

  done();
};
