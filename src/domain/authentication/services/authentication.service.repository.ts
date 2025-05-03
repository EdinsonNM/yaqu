import { UserSession } from "./../models/user-session";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthenticationRepository } from "../repositories/authentication.repository";
import { inject, injectable, registry } from "tsyringe";
import supabase from "../../../core/supabase-client";
import { RoleName } from "../enums/role.enum";

@injectable()
@registry([
  {
    token: "SupabaseClient",
    useValue: supabase,
  },
])
export class AuthenticationServiceRepository
  implements AuthenticationRepository
{
  constructor(
    @inject("SupabaseClient") private readonly supabase: SupabaseClient
  ) {}

  async login(email: string, password: string): Promise<UserSession> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    const userSession = data.session as UserSession;
    const userId = data.session?.user.id;
    const roles = await this.getRolesByUser(userId);
    userSession.roles = roles as RoleName[];
    return userSession;
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async resetPasswordRequest(email: string): Promise<void> {
    await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  }

  async getRolesByUser(userId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from("user_roles")
      .select("roles (name)")
      .eq("user_id", userId);
    if (error) throw error;
    const roleNames = data.map((item) => (item.roles as any)?.name as string);
    return roleNames;
  }
}
