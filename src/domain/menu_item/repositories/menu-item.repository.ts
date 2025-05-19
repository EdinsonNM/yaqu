import { MenuItem } from "../models/menu-item.model";

export abstract class MenuItemRepository {
  abstract getAll(): Promise<MenuItem[]>;
  abstract getAllByMenuId(menuId: string): Promise<MenuItem[]>;
  abstract getById(id: string): Promise<MenuItem | null>;
  abstract create(data: Partial<MenuItem>): Promise<MenuItem>;
  abstract update(id: string, data: Partial<MenuItem>): Promise<MenuItem>;
  abstract delete(id: string): Promise<void>;
  abstract updateAvailability(
    id: string,
    available: boolean
  ): Promise<MenuItem>;
}
