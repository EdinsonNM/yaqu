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
export class GetUserRestaurantsByUserIdUseCase {
  constructor(
    @inject("UserRestaurantRepository")
    private readonly repository: UserRestaurantRepository
  ) {}

  execute(userId: string): Promise<UserRestaurant[]> {
    return this.repository.getByUserId(userId);
  }
}
