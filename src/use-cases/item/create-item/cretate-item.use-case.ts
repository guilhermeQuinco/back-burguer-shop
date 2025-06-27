import { IItemRepository } from "@/repositories/interfaces/item.repository";
import { inject, injectable } from "tsyringe";

interface ItemInput {
  name: string;
  price: number;
}

@injectable()
export class CreateItemUseCase {
  constructor(
    @inject("ItemRepository")
    private readonly itemRepository: IItemRepository
  ) {}

  async execute({ name, price }: ItemInput) {
    const output = await this.itemRepository.create({ name, price });

    return output;
  }
}
