import { ItemController } from "@/http/controllers/item.controller";
import { UserController } from "@/http/controllers/user.controller";
import { IItemRepository } from "@/repositories/interfaces/item.repository";
import { IUserRepository } from "@/repositories/interfaces/user.repository";
import { PrismaItemRepository } from "@/repositories/prisma/prisma-item.repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";
import { CreateItemUseCase } from "@/use-cases/item/create-item/cretate-item.use-case";
import { DeleteItemUseCase } from "@/use-cases/item/delete-item/delete-item.use-case";
import { FindByIdItemUseCase } from "@/use-cases/item/find-by-id/find-by-id.use-case";
import { SearchAllItemsUseCase } from "@/use-cases/item/list-all-items/search-all-item.use-case";
import { CreateUserUseCase } from "@/use-cases/user/create-user/create-user.use-case";
import { FindUserByIdUseCase } from "@/use-cases/user/find-by-id/find-by-id.use-case";
import { container } from "tsyringe";

container.registerSingleton<IItemRepository>(
  "ItemRepository",
  PrismaItemRepository
);
container.registerSingleton(CreateItemUseCase, CreateItemUseCase);
container.registerSingleton(SearchAllItemsUseCase, SearchAllItemsUseCase);
container.registerSingleton(FindByIdItemUseCase, FindByIdItemUseCase);
container.registerSingleton(DeleteItemUseCase, DeleteItemUseCase);

container.register("ItemController", {
  useFactory: (c) => {
    return new ItemController(
      c.resolve(CreateItemUseCase),
      c.resolve(SearchAllItemsUseCase),
      c.resolve(FindByIdItemUseCase),
      c.resolve(DeleteItemUseCase)
    );
  },
});

container.registerSingleton<IUserRepository>(
  "UserRepository",
  PrismaUserRepository
);

container.registerSingleton(CreateUserUseCase, CreateUserUseCase);
container.registerSingleton(FindUserByIdUseCase, FindUserByIdUseCase);

container.register("UserController", {
  useFactory: (c) => {
    return new UserController(
      c.resolve(CreateUserUseCase),
      c.resolve(FindUserByIdUseCase)
    );
  },
});
