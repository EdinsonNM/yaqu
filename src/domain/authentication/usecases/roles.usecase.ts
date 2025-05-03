import { AuthenticationRepository } from "../repositories/authentication.repository";
import { AuthenticationServiceRepository } from "../services/authentication.service.repository";
import { inject, injectable, registry } from "tsyringe";

@injectable()
@registry([
  {
    token: "AuthenticationRepository",
    useClass: AuthenticationServiceRepository,
  },
])
export class RolesUseCase {
 constructor(
   @inject("AuthenticationRepository")
   private repository?: AuthenticationRepository
 ) {}   
 execute(id: string) {
    return this.repository!.getRolesByUser(id);
  }
}