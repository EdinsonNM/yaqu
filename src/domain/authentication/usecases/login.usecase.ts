import { AuthenticationRepository } from "../repositories/authentication.repository";
import { inject, injectable, registry } from "tsyringe";
import { AuthenticationServiceRepository } from "../services/authentication.service.repository";
import { UserSession } from "../models/user-session";
@injectable()
@registry([
  {
    token: "AuthenticationRepository",
    useClass: AuthenticationServiceRepository,
  },
])
export class LoginUsecase {
  constructor(
    @inject("AuthenticationRepository")
    private repository?: AuthenticationRepository
  ) {}

  execute(email: string, password: string): Promise<UserSession> {
    return this.repository!.login(email, password);
  }
}
