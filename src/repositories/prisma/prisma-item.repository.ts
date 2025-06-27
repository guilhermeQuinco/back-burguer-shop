import { Prisma, Item } from "@prisma/client";

import { prisma } from "lib/prisma";
import { injectable } from "tsyringe";
import { IItemRepository } from "../interfaces/item.repository";

@injectable()
export class PrismaItemRepository implements IItemRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data,
    });

    return item;
  }

  async findAll(): Promise<Item[]> {
    const items = await prisma.item.findMany({});

    return items;
  }

  async findById(id: number): Promise<Item | null> {
    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) return null;

    return item;
  }

  async delete(id: number): Promise<void> {
    await prisma.item.delete({ where: { id } });
  }
}
