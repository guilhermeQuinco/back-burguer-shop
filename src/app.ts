import fastify, { FastifyReply, FastifyRequest } from "fastify";

export const app = fastify();

app.get("/burguer", (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ message: "test" });
});
