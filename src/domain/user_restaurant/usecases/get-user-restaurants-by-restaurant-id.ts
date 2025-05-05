import { injectable, inject, registry } from "tsyringe";
import { UserRestaurantRepository } from "../repositories/user-restaurant.repository";
import { UserRestaurantServiceRepository } from "../../../infra/user_restaurant/services/user-restaurant.service.repository";
import { UserRestaurant } from "../models/user-restaurant.model";

@injectable()
@registry([
  {
    token: "UserRestaurantRepository",
    useClass: UserRestaurantServiceRepository,
  },
])
export class GetUserRestaurantsByRestaurantIdUseCase {
  constructor(
    @inject("UserRestaurantRepository")
    private readonly repository: UserRestaurantRepository
  ) {}

  execute(restaurantId: string): Promise<UserRestaurant[]> {
    return this.repository.getByRestaurantId(restaurantId);
  }
}
