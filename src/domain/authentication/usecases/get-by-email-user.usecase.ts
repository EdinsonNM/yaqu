import { inject, injectable, registry } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserServiceRepository } from "../services/user.service.repository";
import { User } from "../models/user";

@injectable()
@registry([
  {
    token: "UserRepository2",
    useClass: UserServiceRepository,
  },
])
export class GetByEmailUserUsecase {
  constructor(
    @inject("UserRepository2")
    private repository?: UserRepository
  ) {}

  execute(email: string): Promise<User | null> {
    return this.repository!.getByEmail(email);
  }
}
