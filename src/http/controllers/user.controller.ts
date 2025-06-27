import { env } from "@/env";
import { CreateUserUseCase } from "@/use-cases/user/create-user/create-user.use-case";
import { FindUserByIdUseCase } from "@/use-cases/user/find-by-id/find-by-id.use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "tsyringe";
import { number, z } from "zod";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password } = schema.parse(request.body);

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send(user);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      id: z.string().uuid(),
    });

    const { id } = schema.parse(request.params);

    const user = await this.findUserByIdUseCase.execute(id);

    return reply.status(200).send(user);
  }
}
