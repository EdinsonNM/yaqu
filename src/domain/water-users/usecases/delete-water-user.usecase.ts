import { injectable, inject, registry } from "tsyringe";
import { WaterUserRepository } from "../repositories/water-user.repository";
import { WaterUserServiceRepository } from "../../../infra/water-users/services/water-user.service.repository";

@injectable()
@registry([
  {
    token: "WaterUserRepository",
    useClass: WaterUserServiceRepository,
  },
])
export class DeleteWaterUserUseCase {
  constructor(
    @inject("WaterUserRepository")
    private readonly repository: WaterUserRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
