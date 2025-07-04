import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AddToCartUseCase } from "@/use-cases/cart/add-to-cart/add-to-cart.use-case";

const cartBodySchema = z.object({
  userId: z.string(),
  itemId: z.number(),
  quantity: z.number(),
});
export class CartController {
  constructor(private readonly addToCartUseCase: AddToCartUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { userId, itemId, quantity } = cartBodySchema.parse(request.body);

    try {
      const cart = await this.addToCartUseCase.execute(
        userId,
        itemId,
        quantity
      );
      reply.status(201).send({ message: "Item added to cart!", data: cart });
    } catch (error) {
      throw new Error("Burguer not found!");
    }
  }
}

// export async function addToCart(request: FastifyRequest, reply: FastifyReply) {
//   const cartBodySchema = z.object({
//     itemId: z.number(),
//     quantity: z.number(),
//   });

//   const { itemId, quantity } = cartBodySchema.parse(request.body);

//   try {
//     const cart = await cartService.addToCart(itemId, quantity);
//     reply.status(201).send({ message: "Burguer added to cart!", data: cart });
//   } catch (error) {
//     throw new Error("Burguer not found!");
//   }
// }

// export async function changeQuantity(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   const CartSchema = z.object({
//     id: z.number(),
//     quantity: z.number(),
//   });

//   const { id, quantity } = CartSchema.parse(request.body);

//   try {
//     const cart = await cartService.changeQuantity(id, quantity);
//     reply.status(201).send({ message: "Quantity Updated", data: cart });
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }

// export async function getCartItems(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   try {
//     const items = await cartService.getCartItems();
//     reply.status(200).send({ data: items });
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }

// export async function removeItemFromCart(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   const cartDeleteBodySchema = z.object({
//     id: z.coerce.number(),
//   });

//   try {
//     const { id } = cartDeleteBodySchema.parse(request.params);

//     await cartService.deleteItemFromCart(id);
//     reply.status(204).send({});
//   } catch (error) {
//     reply.status(500).send({ message: (error as Error).message });
//   }
// }
