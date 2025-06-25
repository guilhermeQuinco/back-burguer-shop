import { ItemController } from "@/http/controllers/item.controller";
import { IItemRepository } from "@/repositories/interfaces/item-repository";
import { PrismaItemRepository } from "@/repositories/prisma/prisma-item.repository";
import { CreateItemUseCase } from "@/use-cases/item/create-item/cretate-item.use-case";
import { container } from "tsyringe";

container.registerSingleton<IItemRepository>(
  "ItemRepository",
  PrismaItemRepository
);
container.registerSingleton(CreateItemUseCase, CreateItemUseCase);
container.register("ItemController", {
  useFactory: (c) => new ItemController(c.resolve(CreateItemUseCase)),
});
