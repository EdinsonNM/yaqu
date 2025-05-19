export class CreateMenuItemDTO {
  menuId: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  available?: boolean;
  preparationTime?: number;
  isVegetarian?: boolean;
  spicyLevel?: number;

  constructor(data: Partial<CreateMenuItemDTO>) {
    this.menuId = data.menuId || "";
    this.name = data.name || "";
    this.price = data.price || 0;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.available = data.available !== undefined ? data.available : true;
    this.preparationTime = data.preparationTime;
    this.isVegetarian = data.isVegetarian;
    this.spicyLevel = data.spicyLevel;
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.menuId) {
      errors.push("El ID del menú es requerido");
    }

    if (!this.name || this.name.trim().length === 0) {
      errors.push("El nombre del ítem es requerido");
    }

    if (this.price === undefined || this.price < 0) {
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
