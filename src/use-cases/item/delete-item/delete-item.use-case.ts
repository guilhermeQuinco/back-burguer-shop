import { IItemRepository } from "@/repositories/interfaces/item.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteItemUseCase {
  constructor(
    @inject("ItemRepository")
    private readonly itemRepository: IItemRepository
  ) {}

  async execute(id: number) {
    await this.itemRepository.delete(id);
  }
}
