import { UserSession } from "../models/user-session";

export abstract class AuthenticationRepository {
  abstract login(email: string, password: string): Promise<UserSession>;
  abstract logout(): Promise<void>;
  abstract resetPasswordRequest(email: string): Promise<void>;
  abstract getRolesByUser(userId: string): Promise<string[]>;
}
