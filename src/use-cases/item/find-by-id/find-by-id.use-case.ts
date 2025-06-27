import { IItemRepository } from "@/repositories/interfaces/item.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdItemUseCase {
  constructor(
    @inject("ItemRepository")
    private readonly itemRepository: IItemRepository
  ) {}

  async execute(id: number) {
    const output = await this.itemRepository.findById(id);

    if (!output) {
      throw new Error("Item não encontrado");
    }

    return output;
  }
}
