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
export class GetAllRestaurantsUseCase {
  constructor(
    @inject("RestaurantRepository")
    private readonly repository: RestaurantRepository
  ) {}

  execute(): Promise<Restaurant[]> {
    return this.repository.getAll();
  }
}
