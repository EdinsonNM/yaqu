import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { WaterUserRepository } from "../../../domain/water-users/repositories/water-user.repository";
import { WaterUser } from "../../../domain/water-users/models/water-user.model";

@injectable()
export class WaterUserServiceRepository implements WaterUserRepository {
  private readonly tableName = "water_users";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(): Promise<WaterUser[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .order("d_fecha_registro", { ascending: false });

    if (error) {
      throw new Error(`Error al obtener usuarios de agua: ${error.message}`);
    }

    return data.map((item) => new WaterUser(item));
  }

  async getById(id: string): Promise<WaterUser | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("ild_usuario", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No se encontró el usuario
      }
      throw new Error(`Error al obtener usuario de agua: ${error.message}`);
    }

    return new WaterUser(data);
  }

  async create(data: Partial<WaterUser>): Promise<WaterUser> {
    const { data: createdData, error } = await this.supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear usuario de agua: ${error.message}`);
    }

    return new WaterUser(createdData);
  }

  async update(id: string, data: Partial<WaterUser>): Promise<WaterUser> {
    const { data: updatedData, error } = await this.supabase
      .from(this.tableName)
      .update(data)
      .eq("ild_usuario", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar usuario de agua: ${error.message}`);
    }

    return new WaterUser(updatedData);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("ild_usuario", id);

    if (error) {
      throw new Error(`Error al eliminar usuario de agua: ${error.message}`);
    }
  }
}
