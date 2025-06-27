import { UserOutput, UserOutputMapper } from "@/common/outputs/user-output";
import { IUserRepository } from "@/repositories/interfaces/user.repository";
import { inject, injectable } from "tsyringe";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<UserOutput> {
    const output = await this.userRepository.findById(id);

    if (!output) {
      throw new Error("User not found");
    }

    return UserOutputMapper.toOutput(output);
  }
}
