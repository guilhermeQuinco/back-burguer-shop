import { ICartRepository } from "@/repositories/interfaces/cart.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddToCartUseCase {
  constructor(
    @inject("CartRepository")
    private readonly cartRepository: ICartRepository
  ) {}

  async execute(userId: string, itemId: number, quantity: number) {
    await this.cartRepository.addToCart(userId, itemId, quantity);
  }
}
