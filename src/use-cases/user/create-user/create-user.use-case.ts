import { IUserRepository } from "@/repositories/interfaces/user.repository";
import { hash } from "@/utils/hashing/hashing";
import { inject, injectable } from "tsyringe";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: UserInput) {
    const passwordHash = await hash(password);

    const output = await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return output;
  }
}
