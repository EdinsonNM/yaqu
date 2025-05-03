import { injectable, inject, registry } from "tsyringe";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import { RestaurantServiceRepository } from "../../../infra/restaurant/services/restaurant.service.repository";

@injectable()
@registry([
  {
    token: "RestaurantRepository",
    useClass: RestaurantServiceRepository,
  },
])
export class DeleteRestaurantUseCase {
  constructor(
    @inject("RestaurantRepository")
    private readonly repository: RestaurantRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
