import { injectable, inject, registry } from "tsyringe";
import { WaterUserRepository } from "../repositories/water-user.repository";
import { WaterUserServiceRepository } from "../../../infra/water-users/services/water-user.service.repository";
import { WaterUser } from "../models/water-user.model";

@injectable()
@registry([
  {
    token: "WaterUserRepository",
    useClass: WaterUserServiceRepository,
  },
])
export class GetWaterUserByIdUseCase {
  constructor(
    @inject("WaterUserRepository")
    private readonly repository: WaterUserRepository
  ) {}

  execute(id: string): Promise<WaterUser | null> {
    return this.repository.getById(id);
  }
}
