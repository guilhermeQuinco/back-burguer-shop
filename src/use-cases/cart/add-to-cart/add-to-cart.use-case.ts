import { ICartRepository } from "@/repositories/interfaces/cart.repository";
import { inject } from "tsyringe";

export class AddToCartUseCase {
  constructor(
    @inject("CartRepository")
    private readonly cartRepository: ICartRepository
  ) {}

  async execute(userId: string, itemId: number, quantity: number) {
    await this.cartRepository.addToCart(userId, itemId, quantity);
  }
}
