import { injectable, inject, registry } from "tsyringe";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import { RestaurantServiceRepository } from "../../../infra/restaurant/services/restaurant.service.repository";
import { Restaurant } from "../models/restaurant.model";

@injectable()
@registry([
  {
    token: "RestaurantRepository",
    useClass: RestaurantServiceRepository,
  },
])
export class GetRestaurantByIdUseCase {
  constructor(
    @inject("RestaurantRepository")
    private readonly repository: RestaurantRepository
  ) {}

  execute(id: string): Promise<Restaurant | null> {
    return this.repository.getById(id);
  }
}
