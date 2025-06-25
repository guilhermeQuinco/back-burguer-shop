import { FastifyInstance } from "fastify";

import {
  addToCart,
  changeQuantity,
  getCartItems,
  removeItemFromCart,
} from "./controllers/cart.controller";
// import {
//   createItem,
//   deleteItem,
//   getItemById,
//   getItems,
//   updateItem,
// } from "./controllers/item.controller";

//   getCategories,
//   getCategoryItems,
// } from "./controllers/category.controller";
import { container } from "tsyringe";
import { ItemController } from "./controllers/item.controller";

export async function appRoutes(app: FastifyInstance) {
  const controller = container.resolve<ItemController>("ItemController");

  app.post("/items", controller.create.bind(controller));
}
