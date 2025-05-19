import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { TabletRepository } from "../../../domain/tablets/repositories/tablet.repository";
import { Tablet } from "../../../domain/tablets/models/tablet.model";

@injectable()
export class TabletServiceRepository implements TabletRepository {
  private readonly tableName = "tables";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(): Promise<Tablet[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(`Error al obtener tablets: ${error.message}`);
    }
    return (data ?? []).map((item) => new Tablet(item));
  }

  async getById(id: string): Promise<Tablet | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Error al obtener tablet: ${error.message}`);
    }
    return new Tablet(data);
  }

  async create(data: Partial<Tablet>): Promise<Tablet> {
    const jsonData = new Tablet(data).toJSON();
    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .insert(jsonData)
      .select()
      .single();
    if (error) {
      throw new Error(`Error al crear tablet: ${error.message}`);
    }
    return new Tablet(result);
  }

  async update(id: string, data: Partial<Tablet>): Promise<Tablet> {
    const jsonData = new Tablet(data).toJSON();
    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .update(jsonData)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw new Error(`Error al actualizar tablet: ${error.message}`);
    }
    return new Tablet(result);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error(`Error al eliminar tablet: ${error.message}`);
    }
  }

  async getAllByRestaurantId(restaurantId: string): Promise<Tablet[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(
        `Error al obtener tablets por restaurante: ${error.message}`
      );
    }
    return (data ?? []).map((item) => new Tablet().fromJSON(item));
  }
}
