import { CartController } from "@/http/controllers/cart.controller";
import { ItemController } from "@/http/controllers/item.controller";
import { UserController } from "@/http/controllers/user.controller";
import { ICartRepository } from "@/repositories/interfaces/cart.repository";
import { IItemRepository } from "@/repositories/interfaces/item.repository";
import { IUserRepository } from "@/repositories/interfaces/user.repository";
import { PrismaCartRepository } from "@/repositories/prisma/prisma-cart.repository";
import { PrismaItemRepository } from "@/repositories/prisma/prisma-item.repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user.repository";
import { AddToCartUseCase } from "@/use-cases/cart/add-to-cart/add-to-cart.use-case";
import { CreateItemUseCase } from "@/use-cases/item/create-item/cretate-item.use-case";
import { DeleteItemUseCase } from "@/use-cases/item/delete-item/delete-item.use-case";
import { FindByIdItemUseCase } from "@/use-cases/item/find-by-id/find-by-id.use-case";
import { SearchAllItemsUseCase } from "@/use-cases/item/list-all-items/search-all-item.use-case";
import { CreateUserUseCase } from "@/use-cases/user/create-user/create-user.use-case";
import { FindUserByIdUseCase } from "@/use-cases/user/find-by-id/find-by-id.use-case";
import { container } from "tsyringe";

// Item
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

// User
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

// Cart
container.registerSingleton<ICartRepository>(
  "CartRepository",
  PrismaCartRepository
);
container.registerSingleton(AddToCartUseCase, AddToCartUseCase);
container.register("CartController", {
  useFactory: (c) => {
    return new CartController(c.resolve(AddToCartUseCase));
  },
});
