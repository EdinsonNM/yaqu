import { injectable, inject, registry } from "tsyringe";
import { UserRestaurantRepository } from "../repositories/user-restaurant.repository";
import { UserRestaurantServiceRepository } from "../../../infra/user_restaurant/services/user-restaurant.service.repository";

@injectable()
@registry([
  {
    token: "UserRestaurantRepository",
    useClass: UserRestaurantServiceRepository,
  },
])
export class DeleteUserRestaurantUseCase {
  constructor(
    @inject("UserRestaurantRepository")
    private readonly repository: UserRestaurantRepository
  ) {}

  execute(userId: string, restaurantId: string): Promise<void> {
    return this.repository.delete(userId, restaurantId);
  }
}
