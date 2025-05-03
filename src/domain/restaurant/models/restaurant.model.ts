import { jsonName, jsonProperty, Serializable } from "ts-serializable";

export class Restaurant extends Serializable {
  @jsonProperty(String, null)
  id?: string;

  @jsonProperty(String)
  name: string = "";

  @jsonProperty(String, null)
  description?: string;

  @jsonProperty(String, null)
  address?: string;

  @jsonProperty(String, null)
  phone?: string;

  @jsonProperty(String, null)
  email?: string;

  @jsonProperty(String, null)
  @jsonName("logo_url")
  logoUrl?: string;

  @jsonProperty(Date, null)
  @jsonName("created_at")
  createdAt?: Date;

  constructor(data?: Partial<Restaurant>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }
}
