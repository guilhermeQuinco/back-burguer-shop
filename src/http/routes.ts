import { FastifyInstance } from "fastify";

import {
  addToCart,
  changeQuantity,
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
import {
  cancelOrder,
  createOrder,
  getOrdeById,
  listOrders,
} from "./controllers/order.controller";
import {
  getCategories,
  getCategoryItems,
} from "./controllers/category.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/item", createItem);
  app.get("/item", getItems);
  app.get("/item/:id", getItemById);

  app.put("/item/:id", updateItem);
  app.delete("/item/:id", deleteItem);

  app.post("/cart", addToCart);
  app.get("/cart", getCartItems);
  app.put("/cart", changeQuantity);
  app.delete("/cart/:id", removeItemFromCart);

  app.post("/order", createOrder);
  app.get("/order", listOrders);
  app.get("/order/:id", getOrdeById);
  app.delete("/order", cancelOrder);

  app.get("/category", getCategories);
  app.get("/category/:slug", getCategoryItems);
}
