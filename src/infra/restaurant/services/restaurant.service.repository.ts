import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { RestaurantRepository } from "../../../domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "../../../domain/restaurant/models/restaurant.model";

@injectable()
export class RestaurantServiceRepository implements RestaurantRepository {
  private readonly tableName = "restaurants";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(): Promise<Restaurant[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error al obtener restaurantes: ${error.message}`);
    }

    return data.map((item) => new Restaurant(item));
  }

  async getById(id: string): Promise<Restaurant | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No se encontró el restaurante
      }
      throw new Error(`Error al obtener restaurante: ${error.message}`);
    }

    return new Restaurant(data);
  }

  async create(data: Partial<Restaurant>): Promise<Restaurant> {
    const jsonData = new Restaurant(data).toJSON();
    const { data: createdData, error } = await this.supabase
      .from(this.tableName)
      .insert(jsonData)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear restaurante: ${error.message}`);
    }

    return new Restaurant(createdData);
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    const jsonData = new Restaurant(data).toJSON();
    const { data: updatedData, error } = await this.supabase
      .from(this.tableName)
      .update(jsonData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar restaurante: ${error.message}`);
    }

    return new Restaurant(updatedData);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Error al eliminar restaurante: ${error.message}`);
    }
  }
}
