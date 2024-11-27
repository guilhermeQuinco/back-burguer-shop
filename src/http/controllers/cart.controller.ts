import { FastifyRequest, FastifyReply } from "fastify";
import * as cartService from "@/services/cartService";
import { z } from "zod";

export async function addToCart(request: FastifyRequest, reply: FastifyReply) {
  const cartBodySchema = z.object({
    productId: z.number(),
    quantity: z.number(),
  });

  const { productId, quantity } = cartBodySchema.parse(request.body);

  try {
    const cart = await cartService.addToCart(productId, quantity);
    reply.status(201).send({ message: "Burguer added to cart!", data: cart });
  } catch (error) {
    throw new Error("Burguer not found!");
  }
}

export async function getCartItems(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const items = await cartService.getCartItems();
    reply.status(200).send({ data: items });
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
