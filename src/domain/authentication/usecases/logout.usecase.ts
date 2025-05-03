import { AuthenticationRepository } from "../repositories/authentication.repository";
import { inject, injectable, registry } from "tsyringe";
import { AuthenticationServiceRepository } from "../services/authentication.service.repository";
@injectable()
@registry([
  {
    token: "AuthenticationRepository",
    useClass: AuthenticationServiceRepository,
  },
])
export class LogoutUsecase {
  constructor(
    @inject("AuthenticationRepository")
    private repository?: AuthenticationRepository
  ) {}

  execute(): Promise<void> {
    return this.repository!.logout();
  }
}
