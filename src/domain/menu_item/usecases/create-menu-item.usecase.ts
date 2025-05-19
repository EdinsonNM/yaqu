import { injectable, inject, registry } from "tsyringe";
import { MenuItemRepository } from "../repositories/menu-item.repository";
import { MenuItem } from "../models/menu-item.model";
import { CreateMenuItemDTO } from "../dtos/create-menu-item.dto";
import { MenuItemServiceRepository } from "../../../infra/menu_item/services/menu-item.service.repository";

@injectable()
@registry([
  {
    token: "MenuItemRepository",
    useClass: MenuItemServiceRepository,
  },
])
export class CreateMenuItemUseCase {
  constructor(
    @inject("MenuItemRepository")
    private readonly repository: MenuItemRepository
  ) {}

  async execute(data: Partial<CreateMenuItemDTO>): Promise<MenuItem> {
    const dto = new CreateMenuItemDTO(data);
    const validation = dto.validate();

    if (!validation.isValid) {
      throw new Error(`Error de validación: ${validation.errors.join(", ")}`);
    }

    return this.repository.create({
      menuId: dto.menuId,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      available: dto.available,
      preparationTime: dto.preparationTime,
      isVegetarian: dto.isVegetarian,
      spicyLevel: dto.spicyLevel,
    });
  }
}
