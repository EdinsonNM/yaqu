import { jsonName, jsonProperty, Serializable } from "ts-serializable";

export class MenuItem extends Serializable {
  @jsonProperty(String, null)
  id?: string;

  @jsonProperty(String, null)
  @jsonName("menu_id")
  menuId?: string;

  @jsonProperty(String)
  name: string = "";

  @jsonProperty(String, null)
  description?: string;

  @jsonProperty(Number)
  price: number = 0;

  @jsonProperty(String, null)
  @jsonName("image_url")
  imageUrl?: string;

  @jsonProperty(Boolean)
  available: boolean = true;

  @jsonProperty(Number, null)
  @jsonName("preparation_time")
  preparationTime?: number;

  @jsonProperty(Boolean, null)
  @jsonName("is_vegetarian")
  isVegetarian?: boolean;

  @jsonProperty(Number, null)
  @jsonName("spicy_level")
  spicyLevel?: number;

  @jsonProperty(Date, null)
  @jsonName("created_at")
  createdAt?: Date;

  constructor(data?: Partial<MenuItem>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }
}
