import { FastifyInstance } from "fastify";

import { container } from "tsyringe";
import { ItemController } from "./controllers/item.controller";
import { UserController } from "./controllers/user.controller";
import { CartController } from "./controllers/cart.controller";

export async function appRoutes(app: FastifyInstance) {
  const itemController = container.resolve<ItemController>("ItemController");
  const userController = container.resolve<UserController>("UserController");
  const cartController = container.resolve<CartController>("CartController");

  app.post("/items", itemController.create.bind(itemController));
  app.get("/items", itemController.list.bind(itemController));
  app.get("/items/:id", itemController.findById.bind(itemController));
  app.delete("/items/:id", itemController.deleteItem.bind(itemController));

  app.post("/users", userController.create.bind(userController));
  app.get("/users/:id", userController.findById.bind(userController));

  app.post("/cart", cartController.create.bind(cartController));
}
