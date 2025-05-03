import { Restaurant } from "../models/restaurant.model";

export abstract class RestaurantRepository {
  abstract getAll(): Promise<Restaurant[]>;
  abstract getById(id: string): Promise<Restaurant | null>;
  abstract create(data: Partial<Restaurant>): Promise<Restaurant>;
  abstract update(id: string, data: Partial<Restaurant>): Promise<Restaurant>;
  abstract delete(id: string): Promise<void>;
}
