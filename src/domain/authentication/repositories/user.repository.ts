import { User, UpdateUserDTO } from "../models/user";

export abstract class UserRepository {
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract create(user: Omit<User, 'id'>): Promise<any>;
  abstract update(id: string, user: UpdateUserDTO): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract list(role?: string): Promise<User[]>;
 
}