import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import * as categoryService from "@/services/categoryService";

export async function getCategoryItems(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categoryParamScehma = z.object({
      slug: z.string(),
    });

    const { slug } = categoryParamScehma.parse(request.params);

    const category = await categoryService.getCategoryItems(slug);
    return reply.status(201).send(category);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getCategories(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const category = await categoryService.getCategories();
    return reply.status(201).send(category);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
