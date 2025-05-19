export class UpdateMenuItemDTO {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  available?: boolean;
  preparationTime?: number;
  isVegetarian?: boolean;
  spicyLevel?: number;
  menuId?: string;

  constructor(data: Partial<UpdateMenuItemDTO>) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.available = data.available;
    this.preparationTime = data.preparationTime;
    this.isVegetarian = data.isVegetarian;
    this.spicyLevel = data.spicyLevel;
    this.menuId = data.menuId;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (this.name !== undefined && this.name.trim().length === 0) {
      errors.push("El nombre del ítem no puede estar vacío");
    }

    if (this.price !== undefined && this.price < 0) {
      errors.push("El precio debe ser un valor numérico positivo");
    }

    if (this.preparationTime !== undefined && this.preparationTime < 0) {
      errors.push("El tiempo de preparación debe ser un valor positivo");
    }

    if (
      this.spicyLevel !== undefined &&
      (this.spicyLevel < 0 || this.spicyLevel > 5)
    ) {
      errors.push("El nivel de picante debe estar entre 0 y 5");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
