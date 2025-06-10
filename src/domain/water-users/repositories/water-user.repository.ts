import { WaterUser } from "../models/water-user.model";

export abstract class WaterUserRepository {
  abstract getAll(): Promise<WaterUser[]>;
  abstract getById(id: string): Promise<WaterUser | null>;
  abstract create(data: Partial<WaterUser>): Promise<WaterUser>;
  abstract update(id: string, data: Partial<WaterUser>): Promise<WaterUser>;
  abstract delete(id: string): Promise<void>;
}
