import { FastifyInstance } from "fastify";

import { addToCart, getCartItems } from "./controllers/cart.controller";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "./controllers/item.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/item", createItem);
  app.get("/item", getItems);
  app.get("/item/:id", getItemById);
  app.put("/item/:id", updateItem);
  app.delete("/item/:id", deleteItem);

  app.post("/cart", addToCart);
  app.get("/cart", getCartItems);
}
