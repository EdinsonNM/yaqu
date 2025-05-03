import { Restaurant } from "../../models/restaurant.model";
import { RestaurantRepository } from "../../repositories/restaurant.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../main/config/types";

@injectable()
export class CreateRestaurantUseCase {
  constructor(
    @inject(TYPES.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute(
    restaurantData: Omit<Restaurant, "id" | "createdAt" | "updatedAt">
  ): Promise<Restaurant> {
    return this.restaurantRepository.create(restaurantData);
  }
}
