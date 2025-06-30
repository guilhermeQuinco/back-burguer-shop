import { inject, injectable } from "tsyringe";
import { ICartRepository } from "../interfaces/cart.repository";
import { prisma } from "lib/prisma";

@injectable()
export class PrismaCartRepository implements ICartRepository {
  async addToCart(
    userId: string,
    itemId: number,
    quantity: number
  ): Promise<void> {
    const item = await prisma.item.findFirst({ where: { id: itemId } });

    if (!item) {
      throw new Error("Item not found");
    }

    await prisma.cart.create({
      data: {
        itemId,
        userId,
        quantity,
      },
    });
  }
}
