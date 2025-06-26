import { env } from "@/env";
import * as itemService from "@/services/itemService";
import { CreateItemUseCase } from "@/use-cases/item/create-item/cretate-item.use-case";
import { SearchAllItemsUseCase } from "@/use-cases/item/list-all-items/search-all-item.use-case";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "tsyringe";
import { number, z } from "zod";

export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly searchAllUsersUseCase: SearchAllItemsUseCase
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      name: z.string(),
      price: z.number(),
    });

    const { name, price } = schema.parse(request.body);

    const item = await this.createItemUseCase.execute({ name, price });

    return reply.status(201).send(item);
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const items = await this.searchAllUsersUseCase.execute();
    return reply.status(200).send(items);
  }
}

// export async function createItem(request: FastifyRequest, reply: FastifyReply) {
//   try {
//     return reply
//       .status(201)
//       .send({ message: "burguer created", data: createdBurguer });
//   } catch (error) {

// }

// export async function getItems(request: FastifyRequest, reply: FastifyReply) {
//   try {
//     const burguers = await itemService.getItems();

//     return reply.status(200).send(burguers);
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }

// export async function getItemById(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   try {
//     const getBurguerParamSchema = z.object({
//       id: z.coerce.number(),
//     });

//     const { id } = getBurguerParamSchema.parse(request.params);
//     const burguer = await itemService.getItemById(id);

//     return reply.status(200).send(burguer);
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }

// export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
//   const getBurguerParamSchema = z.object({
//     id: z.coerce.number(),
//   });

//   const { id } = getBurguerParamSchema.parse(request.params);

//   const burgerData: any = request.body;

//   try {
//     const burguer = await itemService.updateItem(id, burgerData);

//     return reply.status(200).send(burguer);
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }

// export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
//   const getBurguerParamSchema = z.object({
//     id: z.coerce.number(),
//   });

//   const { id } = getBurguerParamSchema.parse(request.params);

//   try {
//     await itemService.deleteItem(id);

//     return reply.status(204).send({ message: "buguer deleted" });
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }
