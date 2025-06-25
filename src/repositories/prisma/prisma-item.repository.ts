import { Prisma, Item } from "@prisma/client";
import { IItemRepository } from "../interfaces/item-repository";
import { prisma } from "lib/prisma";
import { injectable } from "tsyringe";

@injectable()
export class PrismaItemRepository implements IItemRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data,
    });

    return item;
  }
}
