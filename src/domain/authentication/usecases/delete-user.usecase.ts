import { inject, injectable, registry } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserServiceRepository } from "../services/user.service.repository";

@injectable()
@registry([
  {
    token: "UserRepository",
    useClass: UserServiceRepository,
  },
])
export class DeleteUserUsecase {
  constructor(
    @inject("UserRepository")
    private repository?: UserRepository
  ) {}

  async execute(userId: string): Promise<void> {
    return this.repository!.delete(userId);
  }
}
