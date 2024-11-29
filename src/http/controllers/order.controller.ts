import * as orderService from "@/services/orderService";
import { FastifyReply, FastifyRequest } from "fastify";

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
