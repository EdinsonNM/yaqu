import { Restaurant } from "../../models/restaurant.model";
import { RestaurantRepository } from "../../repositories/restaurant.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../main/config/types";

@injectable()
export class GetAllRestaurantsUseCase {
  constructor(
    @inject(TYPES.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute(): Promise<Restaurant[]> {
    return this.restaurantRepository.getAll();
  }
}
