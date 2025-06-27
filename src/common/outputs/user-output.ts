import { User } from "@prisma/client";

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
    };
  }
}
