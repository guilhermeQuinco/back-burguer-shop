import { ItemController } from "@/http/controllers/item.controller";
import { IItemRepository } from "@/repositories/interfaces/item-repository";
import { PrismaItemRepository } from "@/repositories/prisma/prisma-item.repository";
import { CreateItemUseCase } from "@/use-cases/item/create-item/cretate-item.use-case";
import { SearchAllItemsUseCase } from "@/use-cases/item/list-all-items/search-all-item.use-case";
import { container } from "tsyringe";

container.registerSingleton<IItemRepository>(
  "ItemRepository",
  PrismaItemRepository
);
container.registerSingleton(CreateItemUseCase, CreateItemUseCase);
container.registerSingleton(SearchAllItemsUseCase, SearchAllItemsUseCase);
container.register("ItemController", {
  useFactory: (c) => {
    return new ItemController(
      c.resolve(CreateItemUseCase),
      c.resolve(SearchAllItemsUseCase)
    );
  },
});
