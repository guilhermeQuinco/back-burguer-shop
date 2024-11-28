import { FastifyInstance } from "fastify";

import {
  addToCart,
  getCartItems,
  removeItemFromCart,
} from "./controllers/cart.controller";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "./controllers/item.controller";
import { createOrder } from "./controllers/order.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/item", createItem);
  app.get("/item", getItems);
  app.get("/item/:id", getItemById);
  app.put("/item/:id", updateItem);
  app.delete("/item/:id", deleteItem);

  app.post("/cart", addToCart);
  app.get("/cart", getCartItems);
  app.delete("/cart/:id", removeItemFromCart);

  app.post("/order", createOrder);
}
