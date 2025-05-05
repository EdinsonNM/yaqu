import { User } from "@domain/authentication/models/user";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { jsonName, jsonProperty, Serializable } from "ts-serializable";

export class UserRestaurant extends Serializable {
  @jsonProperty(String, null)
  @jsonName("user_id")
  userId?: string;

  @jsonProperty(String, null)
  @jsonName("restaurant_id")
  restaurantId?: string;

  @jsonProperty(Date, null)
  @jsonName("created_at")
  createdAt?: Date;

  constructor(data?: Partial<UserRestaurant>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }

  user?: User;
  restaurant?: Restaurant;
}
