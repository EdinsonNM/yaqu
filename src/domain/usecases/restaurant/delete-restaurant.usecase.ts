import { RestaurantRepository } from "../../repositories/restaurant.repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../main/config/types";

@injectable()
export class DeleteRestaurantUseCase {
  constructor(
    @inject(TYPES.RestaurantRepository)
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.restaurantRepository.delete(id);
  }
}
