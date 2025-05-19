import { Tablet } from "../models/tablet.model";

export abstract class TabletRepository {
  abstract getAll(): Promise<Tablet[]>;
  abstract getById(id: string): Promise<Tablet | null>;
  abstract create(data: Partial<Tablet>): Promise<Tablet>;
  abstract update(id: string, data: Partial<Tablet>): Promise<Tablet>;
  abstract delete(id: string): Promise<void>;
  abstract getAllByRestaurantId(restaurantId: string): Promise<Tablet[]>;
}
