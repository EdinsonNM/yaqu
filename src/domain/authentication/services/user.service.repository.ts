import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable, registry } from "tsyringe";
import supabase from "../../../core/supabase-client";
import { UserRepository } from "../repositories/user.repository";
import { User, UpdateUserDTO } from "../models/user";

@injectable()
@registry([
  {
    token: "SupabaseClient",
    useValue: supabase,
  },
])
export class UserServiceRepository implements UserRepository {
  private tableName = "profiles";
  constructor(
    @inject("SupabaseClient") private readonly supabase: SupabaseClient
  ) {}

  async getById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;
    return data;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const endpoint = `${supabaseUrl}/functions/v1/create-user`;

    const requestBody = {
      email: user.email,
      password: user.password,
      full_name: user.fullName,
      roles: user.roles || [],
    };
    const token = (await this.supabase.auth.getSession()).data.session
      ?.access_token;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.message || "Failed to create user");
      }

      const responseData = await response.json();
      const createdUser = new User().fromJSON(responseData);
      return createdUser;
    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User> {
    try {
      // 1. Actualizar el nombre completo en la tabla profiles
      const { error: profileError } = await this.supabase
        .from(this.tableName)
        .update({ full_name: userData.fullName })
        .eq("id", id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        throw new Error(
          `Error al actualizar el perfil: ${profileError.message}`
        );
      }

      // 2. Si hay roles para actualizar
      if (userData.roles && userData.roles.length > 0) {
        // Primero eliminamos los roles existentes
        const { error: deleteRolesError } = await this.supabase
          .from("user_roles")
          .delete()
          .eq("user_id", id);

        if (deleteRolesError) {
          console.error("Error deleting roles:", deleteRolesError);
          throw new Error(
            `Error al eliminar roles existentes: ${deleteRolesError.message}`
          );
        }

        // Obtenemos los IDs de los roles
        const { data: rolesData, error: getRolesError } = await this.supabase
          .from("roles")
          .select("id, name")
          .in("name", userData.roles);

        if (getRolesError) {
          console.error("Error getting roles:", getRolesError);
          throw new Error(`Error al obtener roles: ${getRolesError.message}`);
        }

        // Creamos los nuevos registros de user_roles
        const userRoles = rolesData.map((role) => ({
          user_id: id,
          role_id: role.id,
        }));

        const { error: insertRolesError } = await this.supabase
          .from("user_roles")
          .insert(userRoles);

        if (insertRolesError) {
          console.error("Error inserting roles:", insertRolesError);
          throw new Error(
            `Error al asignar roles: ${insertRolesError.message}`
          );
        }
      }

      // 3. Obtener el usuario actualizado
      const { data: updatedProfile, error: getProfileError } =
        await this.supabase
          .from(this.tableName)
          .select("*")
          .eq("id", id)
          .single();

      if (getProfileError) {
        console.error("Error getting updated profile:", getProfileError);
        throw new Error(
          `Error al obtener el perfil actualizado: ${getProfileError.message}`
        );
      }

      // 4. Obtener los roles actualizados
      const { data: updatedRoles, error: getUpdatedRolesError } =
        await this.supabase
          .from("user_roles")
          .select("roles(name)")
          .eq("user_id", id);

      if (getUpdatedRolesError) {
        console.error("Error getting updated roles:", getUpdatedRolesError);
        throw new Error(
          `Error al obtener roles actualizados: ${getUpdatedRolesError.message}`
        );
      }

      // 5. Crear y devolver el objeto User actualizado
      const updatedUser = new User().fromJSON(updatedProfile);
      updatedUser.roles = updatedRoles.map(
        (item) => (item.roles as any)?.name as string
      );

      return updatedUser;
    } catch (error) {
      console.error("Detailed error during update:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const endpoint = `${supabaseUrl}/functions/v1/delete-user`;
    const requestBody = {
      id,
    };
    try {
      const token = (await this.supabase.auth.getSession()).data.session
        ?.access_token;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.message || "Failed to create user");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }
  }

  async list(role?: string): Promise<User[]> {
    try {
      if (role && role !== "todos") {
        // Obtener los IDs de usuarios que tienen el rol específico
        const { data: roleData, error: roleError } = await this.supabase
          .from("roles")
          .select("id")
          .eq("name", role)
          .single();

        if (roleError) {
          throw new Error(roleError.message);
        }

        if (!roleData) {
          return [];
        }

        const roleId = roleData.id;

        // Obtener los usuarios que tienen este rol
        const { data: userRolesData, error: userRolesError } =
          await this.supabase
            .from("user_roles")
            .select("user_id")
            .eq("role_id", roleId);

        if (userRolesError) {
          console.error(
            "Error al obtener usuarios con el rol:",
            userRolesError
          );
          throw new Error(userRolesError.message);
        }

        if (!userRolesData || userRolesData.length === 0) {
          console.log(`No se encontraron usuarios con el rol: ${role}`);
          return [];
        }

        // Extraer los IDs de usuario
        const userIds = userRolesData.map((item) => item.user_id);
        console.log(`Usuarios con rol ${role}:`, userIds);

        // Obtener los perfiles de estos usuarios
        const { data: profilesData, error: profilesError } = await this.supabase
          .from(this.tableName)
          .select("*")
          .in("id", userIds);

        if (profilesError) {
          console.error("Error al obtener perfiles:", profilesError);
          throw new Error(profilesError.message);
        }

        if (!profilesData || profilesData.length === 0) {
          console.log("No se encontraron perfiles para los usuarios filtrados");
          return [];
        }

        // Crear objetos User a partir de los perfiles
        const users = profilesData.map((profile) =>
          new User().fromJSON(profile)
        );

        // Obtener todos los roles para los usuarios filtrados
        const { data: allUserRoles, error: rolesError } = await this.supabase
          .from("user_roles")
          .select(
            `
            user_id,
            roles(id, name)
          `
          )
          .in("user_id", userIds);

        if (rolesError) {
          console.error("Error al obtener todos los roles:", rolesError);
          throw new Error(rolesError.message);
        }

        // Asignar roles a cada usuario
        if (allUserRoles && allUserRoles.length > 0) {
          const userRolesMap = new Map<string, string[]>();

          allUserRoles.forEach((item) => {
            const userId = item.user_id;
            const roleName = (item.roles as any)?.name as string;

            if (!userRolesMap.has(userId)) {
              userRolesMap.set(userId, []);
            }

            if (roleName) {
              userRolesMap.get(userId)?.push(roleName);
            }
          });

          users.forEach((user) => {
            if (user.id && userRolesMap.has(user.id)) {
              user.roles = userRolesMap.get(user.id) || [];
            } else {
              user.roles = [];
            }
          });
        }

        return users;
      } else {
        // Si no hay filtro de rol o es 'todos', obtenemos todos los usuarios
        console.log("Obteniendo todos los usuarios sin filtro de rol");

        // Obtener todos los perfiles
        const { data: profilesData, error: profilesError } = await this.supabase
          .from(this.tableName)
          .select("*");

        if (profilesError) {
          console.error("Error al obtener todos los perfiles:", profilesError);
          throw new Error(profilesError.message);
        }

        if (!profilesData || profilesData.length === 0) {
          console.log("No se encontraron perfiles");
          return [];
        }

        // Crear objetos User a partir de los perfiles
        const users = profilesData.map((profile) =>
          new User().fromJSON(profile)
        );

        // Obtener todos los roles para todos los usuarios
        const userIds = users.map((user) => user.id).filter(Boolean);

        if (userIds.length === 0) return users;

        const { data: allUserRoles, error: rolesError } = await this.supabase
          .from("user_roles")
          .select(
            `
            user_id,
            roles(id, name)
          `
          )
          .in("user_id", userIds);

        if (rolesError) {
          console.error(
            "Error al obtener roles para todos los usuarios:",
            rolesError
          );
          throw new Error(rolesError.message);
        }

        // Asignar roles a cada usuario
        if (allUserRoles && allUserRoles.length > 0) {
          const userRolesMap = new Map<string, string[]>();

          allUserRoles.forEach((item) => {
            const userId = item.user_id;
            const roleName = (item.roles as any)?.name as string;

            if (!userRolesMap.has(userId)) {
              userRolesMap.set(userId, []);
            }

            if (roleName) {
              userRolesMap.get(userId)?.push(roleName);
            }
          });

          users.forEach((user) => {
            if (user.id && userRolesMap.has(user.id)) {
              user.roles = userRolesMap.get(user.id) || [];
            } else {
              user.roles = [];
            }
          });
        }

        return users;
      }
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      throw error;
    }
  }
}
