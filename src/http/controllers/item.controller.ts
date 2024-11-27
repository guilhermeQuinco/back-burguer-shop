import { env } from "@/env";
import * as itemService from "@/services/itemService";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { number, z } from "zod";

export async function createItem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createItemBodySchema = z.object({
      name: z.string(),
      price: z.number(),
      description: z.string(),
      imageUrl: z.string(),
    });

    const { name, price, imageUrl, description } = createItemBodySchema.parse(
      request.body
    );

    const itemData: any = {
      name,
      price,
      description,
      imageUrl,
    };

    const createdBurguer = await itemService.createItem(itemData);

    return reply
      .status(201)
      .send({ message: "burguer created", data: createdBurguer });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getItems(request: FastifyRequest, reply: FastifyReply) {
  try {
    const burguers = await itemService.getItems();

    return reply.status(200).send(burguers);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getItemById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    const burguer = await itemService.getItemById(id);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  const burgerData: any = request.body;

  try {
    const burguer = await itemService.updateItem(id, burgerData);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    await itemService.deleteItem(id);

    return reply.status(204).send({ message: "buguer deleted" });
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
