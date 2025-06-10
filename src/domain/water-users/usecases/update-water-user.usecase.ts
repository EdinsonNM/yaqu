import { injectable, inject, registry } from "tsyringe";
import { WaterUserRepository } from "../repositories/water-user.repository";
import { WaterUserServiceRepository } from "../../../infra/water-users/services/water-user.service.repository";
import { WaterUser } from "../models/water-user.model";
import { UpdateWaterUserDTO } from "../dtos/update-water-user.dto";

@injectable()
@registry([
  {
    token: "WaterUserRepository",
    useClass: WaterUserServiceRepository,
  },
])
export class UpdateWaterUserUseCase {
  constructor(
    @inject("WaterUserRepository")
    private readonly repository: WaterUserRepository
  ) {}

  async execute(id: string, dto: UpdateWaterUserDTO): Promise<WaterUser> {
    const validation = dto.validate();
    if (!validation.isValid) {
      throw new Error(`Error de validación: ${validation.errors.join(', ')}`);
    }
    
    return this.repository.update(id, dto);
  }
}
