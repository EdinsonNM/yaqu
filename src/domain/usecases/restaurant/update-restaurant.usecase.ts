import { Restaurant } from "../../models/restaurant.model";
import { RestaurantRepository } from "../../repositories/restaurant.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../main/config/types";

@injectable()
export class UpdateRestaurantUseCase {
  constructor(
    @inject(TYPES.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute(
    id: string,
    restaurantData: Partial<Omit<Restaurant, "id" | "createdAt" | "updatedAt">>
  ): Promise<Restaurant | null> {
    return this.restaurantRepository.update(id, restaurantData);
  }
}
