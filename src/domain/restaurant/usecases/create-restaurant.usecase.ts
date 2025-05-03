import { injectable, inject, registry } from "tsyringe";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import { RestaurantServiceRepository } from "../../../infra/restaurant/services/restaurant.service.repository";
import { Restaurant } from "../models/restaurant.model";
import { CreateRestaurantDTO } from "../dtos/create-restaurant.dto";

@injectable()
@registry([
  {
    token: "RestaurantRepository",
    useClass: RestaurantServiceRepository,
  },
])
export class CreateRestaurantUseCase {
  constructor(
    @inject("RestaurantRepository")
    private readonly repository: RestaurantRepository
  ) {}

  execute(params: Partial<Restaurant>): Promise<Restaurant> {
    return this.repository.create(params);
  }
}
