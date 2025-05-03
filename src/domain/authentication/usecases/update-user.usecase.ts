import { inject, injectable, registry } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserServiceRepository } from "../services/user.service.repository";
import { UpdateUserDTO, User } from "../models/user";

@injectable()
@registry([
  {
    token: "UserRepository",
    useClass: UserServiceRepository,
  },
])
export class UpdateUserUsecase {
  constructor(
    @inject("UserRepository")
    private repository?: UserRepository
  ) {}

  execute(id: string, userData: UpdateUserDTO): Promise<User> {
    return this.repository!.update(id, userData);
  }
}
