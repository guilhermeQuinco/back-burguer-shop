import { Item, Prisma } from "@prisma/client";

export interface ItemRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>;
}
