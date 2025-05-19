import { jsonName, jsonProperty, Serializable } from "ts-serializable";
import { Restaurant } from "../../restaurant/models/restaurant.model";

export class Menu extends Serializable {
  @jsonProperty(String, null)
  id?: string;

  @jsonProperty(String, null)
  @jsonName("restaurant_id")
  restaurantId?: string;

  @jsonProperty(String)
  name: string = "";

  @jsonProperty(String, null)
  description?: string;

  @jsonProperty(Boolean, null)
  active?: boolean = true;

  @jsonProperty(String, null)
  @jsonName("available_from")
  availableFrom?: string;

  @jsonProperty(String, null)
  @jsonName("available_to")
  availableTo?: string;

  @jsonProperty(Date, null)
  @jsonName("created_at")
  createdAt?: Date;

  @jsonProperty(String, null)
  @jsonName("image_url")
  imageUrl?: string;

  // Relaciones
  restaurant?: Restaurant;

  constructor(data?: Partial<Menu>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }
}
