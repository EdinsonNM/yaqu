import { jsonName, jsonProperty, Serializable } from "ts-serializable";

export class Tablet extends Serializable {
  @jsonProperty(String, null)
  id?: string;

  @jsonProperty(String, null)
  @jsonName("restaurant_id")
  restaurantId?: string;

  @jsonProperty(String, null)
  @jsonName("table_number")
  tableNumber?: string;

  @jsonProperty(Number, null)
  seats?: number;

  @jsonProperty(String, null)
  @jsonName("qr_code_url")
  qrCodeUrl?: string;

  @jsonProperty(String, null)
  status?: string;

  @jsonProperty(Date, null)
  @jsonName("created_at")
  createdAt?: Date;

  @jsonProperty(String, null)
  @jsonName("location_id")
  locationId?: string;

  constructor(data?: Partial<Tablet>) {
    super();
    if (!data) return;
    Object.assign(this, data);
  }
}
