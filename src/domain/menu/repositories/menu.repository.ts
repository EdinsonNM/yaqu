import { Menu } from "../models/menu.model";

export abstract class MenuRepository {
  abstract getAll(restaurantId: string): Promise<Menu[]>;
  abstract getById(id: string): Promise<Menu | null>;
  abstract create(data: Partial<Menu>): Promise<Menu>;
  abstract update(id: string, data: Partial<Menu>): Promise<Menu>;
  abstract delete(id: string): Promise<void>;
  abstract toggleActive(id: string, active: boolean): Promise<Menu>;
  abstract uploadMenuImage(id: string, file: File): Promise<Menu>;
}
