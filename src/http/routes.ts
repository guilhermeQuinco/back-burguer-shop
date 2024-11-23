import { FastifyInstance } from "fastify";
import {
  createBurguer,
  deleteBurguer,
  getBurguerById,
  getBurguers,
  updateBurguer,
} from "./controllers/product.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/burguer", createBurguer);
  app.get("/burguer", getBurguers);
  app.get("/burguer/:id", getBurguerById);
  app.put("/burguer/:id", updateBurguer);
  app.delete("/burguer/:id", deleteBurguer);
}
