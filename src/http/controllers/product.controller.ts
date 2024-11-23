import { IBurguer } from "@/@types/Burguer";
import * as burguerService from "@/services/burguerService";
import { FastifyReply, FastifyRequest } from "fastify";
import { number, z } from "zod";

export async function createBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createBurguerBodySchema = z.object({
    name: z.string(),
    price: z.number(),
  });

  const { name, price } = createBurguerBodySchema.parse(request.body);

  const burguerData: any = {
    name,
    price,
  };

  try {
    const createdBurguer = await burguerService.createBurguer(burguerData);

    return reply
      .status(201)
      .send({ message: "burguer created", data: createdBurguer });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getBurguers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const burguers = await burguerService.getBurguers();

    return reply.status(200).send(burguers);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getBurguerById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    const burguer = await burguerService.getBurguerById(id);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function updateBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  const burgerData: any = request.body;

  try {
    const burguer = await burguerService.updateBurguer(id, burgerData);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function deleteBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    await burguerService.deleteBurguer(id);

    return reply.status(204).send({ message: "buguer deleted" });
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
