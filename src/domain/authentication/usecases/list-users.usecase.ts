import { inject, injectable, registry } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserServiceRepository } from "../services/user.service.repository";
import { User } from "../models/user";

@injectable()
@registry([
  {
    token: "UserRepository",
    useClass: UserServiceRepository,
  },
])
export class ListUsersUsecase {
  constructor(
    @inject("UserRepository")
    private repository?: UserRepository
  ) {}

  execute(role?: string): Promise<User[]> {
    return this.repository!.list(role);
  }
}
