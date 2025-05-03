import { Restaurant } from "../models/restaurant.model";

export interface RestaurantRepository {
  getAll(): Promise<Restaurant[]>;
  getById(id: string): Promise<Restaurant | null>;
  create(
    restaurant: Omit<Restaurant, "id" | "createdAt" | "updatedAt">
  ): Promise<Restaurant>;
  update(
    id: string,
    restaurant: Partial<Omit<Restaurant, "id" | "createdAt" | "updatedAt">>
  ): Promise<Restaurant | null>;
  delete(id: string): Promise<boolean>;
}
