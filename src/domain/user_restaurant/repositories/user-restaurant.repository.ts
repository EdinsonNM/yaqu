import { UserRestaurant } from "../models/user-restaurant.model";

export abstract class UserRestaurantRepository {
  abstract getAll(): Promise<UserRestaurant[]>;
  abstract getByUserId(userId: string): Promise<UserRestaurant[]>;
  abstract getByRestaurantId(restaurantId: string): Promise<UserRestaurant[]>;
  abstract create(data: Partial<UserRestaurant>): Promise<UserRestaurant>;
  abstract delete(userId: string, restaurantId: string): Promise<void>;
}
