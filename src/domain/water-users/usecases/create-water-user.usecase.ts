import { injectable, inject, registry } from "tsyringe";
import { WaterUserRepository } from "../repositories/water-user.repository";
import { WaterUserServiceRepository } from "../../../infra/water-users/services/water-user.service.repository";
import { WaterUser } from "../models/water-user.model";
import { CreateWaterUserDTO } from "../dtos/create-water-user.dto";

@injectable()
@registry([
  {
    token: "WaterUserRepository",
    useClass: WaterUserServiceRepository,
  },
])
export class CreateWaterUserUseCase {
  constructor(
    @inject("WaterUserRepository")
    private readonly repository: WaterUserRepository
  ) {}

  async execute(dto: CreateWaterUserDTO): Promise<WaterUser> {
    const validation = dto.validate();
    if (!validation.isValid) {
      throw new Error(`Error de validación: ${validation.errors.join(', ')}`);
    }
    
    return this.repository.create(dto);
  }
}
