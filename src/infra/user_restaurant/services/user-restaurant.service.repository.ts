import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserRestaurantRepository } from "../../../domain/user_restaurant/repositories/user-restaurant.repository";
import { UserRestaurant } from "../../../domain/user_restaurant/models/user-restaurant.model";
import { User } from "@domain/authentication/models/user";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";

@injectable()
export class UserRestaurantServiceRepository
  implements UserRestaurantRepository
{
  private readonly tableName = "user_restaurants";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(): Promise<UserRestaurant[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("* , restaurants(*) as restaurant, users(*) as user")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `Error al obtener relaciones usuario-restaurante: ${error.message}`
      );
    }

    return data.map((item) => new UserRestaurant(item));
  }

  async getByUserId(userId: string): Promise<UserRestaurant[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `
        *,
        restaurant:restaurant_id(*),
        profile:user_id(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `Error al obtener restaurantes del usuario: ${error.message}`
      );
    }

    return data.map((item: any) => {
      const entity = new UserRestaurant().fromJSON(item);
      entity.user = new User().fromJSON(item.profile);
      entity.restaurant = new Restaurant().fromJSON(item.restaurant);
      return entity;
    });
  }

  async getByRestaurantId(restaurantId: string): Promise<UserRestaurant[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(
        `
        *,
        restaurant:restaurant_id(*),
        profile:user_id(*, roles:user_roles(role:role_id(name)))
      `
      )
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `Error al obtener usuarios del restaurante: ${error.message}`
      );
    }
    return data.map((item: any) => {
      const entity = new UserRestaurant().fromJSON(item);
      const { roles, ...user } = item.profile;
      entity.user = new User().fromJSON(user);
      entity.user.roles = roles?.map((roleObj: any) => roleObj.role.name) || [];
      entity.restaurant = new Restaurant().fromJSON(item.restaurant);
      return entity;
    });
  }

  async create(data: Partial<UserRestaurant>): Promise<UserRestaurant> {
    const item = new UserRestaurant(data).toJSON();
    const { data: createdData, error } = await this.supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Error al crear relación usuario-restaurante: ${error.message}`
      );
    }

    return new UserRestaurant(createdData);
  }

  async delete(userId: string, restaurantId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("user_id", userId)
      .eq("restaurant_id", restaurantId);

    if (error) {
      throw new Error(
        `Error al eliminar relación usuario-restaurante: ${error.message}`
      );
    }
  }
}
