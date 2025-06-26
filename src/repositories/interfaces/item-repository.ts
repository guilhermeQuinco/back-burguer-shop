import { Item, Prisma } from "@prisma/client";

export interface IItemRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>;
  findAll(): Promise<Item[]>;
}
