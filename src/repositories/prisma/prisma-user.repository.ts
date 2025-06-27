import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/user.repository";
import { prisma } from "lib/prisma";

export class PrismaUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return user;
  }

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
