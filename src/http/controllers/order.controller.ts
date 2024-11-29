import * as orderService from "@/services/orderService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const order = orderService.createOrder();
    reply.status(201).send(order);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const orders = await orderService.getOrders();
    reply.status(200).send(orders);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getOrdeById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const orderIdSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = orderIdSchema.parse(request.params);
  try {
    const orders = await orderService.getOrderById(id);
    reply.status(200).send(orders);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function cancelOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const orderDeleteSchema = z.object({
    orderId: z.coerce.number(),
  });

  const { orderId } = orderDeleteSchema.parse(request.body);

  try {
    await orderService.cancelOrder(orderId);
    reply.status(204).send({ message: "Pedido apagado" });
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
