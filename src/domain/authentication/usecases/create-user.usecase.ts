import { inject, injectable, registry } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserServiceRepository } from "../services/user.service.repository";
import { CreateUserDTO, User } from "../models/user";

@injectable()
@registry([
  {
    token: "UserRepository",
    useClass: UserServiceRepository,
  },
])
export class CreateUserUsecase {
  constructor(
    @inject("UserRepository")
    private repository?: UserRepository
  ) {}

  execute(userData: CreateUserDTO): Promise<User> {
    return this.repository!.create(userData);
  }
}
