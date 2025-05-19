import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { MenuItemRepository } from "../../../domain/menu_item/repositories/menu-item.repository";
import { MenuItem } from "../../../domain/menu_item/models/menu-item.model";

@injectable()
export class MenuItemServiceRepository implements MenuItemRepository {
  private readonly tableName = "menu_items";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(): Promise<MenuItem[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error al obtener ítems de menú: ${error.message}`);
    }

    return data.map((item) => new MenuItem(item));
  }

  async getAllByMenuId(menuId: string): Promise<MenuItem[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("menu_id", menuId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `Error al obtener ítems de menú por menú ID: ${error.message}`
      );
    }

    return data.map((item) => new MenuItem().fromJSON(item));
  }

  async getById(id: string): Promise<MenuItem | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No se encontró el ítem
      }
      throw new Error(`Error al obtener ítem de menú: ${error.message}`);
    }

    return new MenuItem(data);
  }

  async create(data: Partial<MenuItem>): Promise<MenuItem> {
    const jsonData = new MenuItem(data).toJSON();

    const { data: newItem, error } = await this.supabase
      .from(this.tableName)
      .insert(jsonData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear ítem de menú: ${error.message}`);
    }

    return new MenuItem(newItem);
  }

  async update(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    const jsonData = new MenuItem(data).toJSON();

    const { data: updatedItem, error } = await this.supabase
      .from(this.tableName)
      .update(jsonData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar ítem de menú: ${error.message}`);
    }

    return new MenuItem(updatedItem);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Error al eliminar ítem de menú: ${error.message}`);
    }
  }

  async updateAvailability(id: string, available: boolean): Promise<MenuItem> {
    const { data: updatedItem, error } = await this.supabase
      .from(this.tableName)
      .update({ available })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Error al actualizar disponibilidad del ítem: ${error.message}`
      );
    }

    return new MenuItem(updatedItem);
  }
}
