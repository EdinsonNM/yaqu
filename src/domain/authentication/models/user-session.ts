import { Session } from "@supabase/supabase-js";
import { RoleName } from "../enums/role.enum";

export type UserSession = Session & { roles: RoleName[] };
