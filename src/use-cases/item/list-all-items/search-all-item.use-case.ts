import { IItemRepository } from "@/repositories/interfaces/item-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class SearchAllItemsUseCase {
  constructor(
    @inject("ItemRepository")
    private readonly itemRepository: IItemRepository
  ) {}

  async execute() {
    const output = await this.itemRepository.findAll();

    return output;
  }
}
