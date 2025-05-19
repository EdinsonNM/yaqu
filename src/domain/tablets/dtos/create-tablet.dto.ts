export class CreateTabletDTO {
  restaurantId?: string;
  tableNumber?: string;
  seats?: number;
  qrCodeUrl?: string;
  status?: string;
  locationId?: string;

  constructor(data?: Partial<CreateTabletDTO>) {
    if (!data) return;
    Object.assign(this, data);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.tableNumber) errors.push("El número de mesa es obligatorio");
    if (!this.seats || this.seats < 1)
      errors.push("La cantidad de asientos debe ser mayor a 0");
    return errors;
  }
}
