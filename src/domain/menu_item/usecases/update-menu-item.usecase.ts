import { injectable, inject, registry } from "tsyringe";
import { MenuItemRepository } from "../repositories/menu-item.repository";
import { MenuItem } from "../models/menu-item.model";
import { UpdateMenuItemDTO } from "../dtos/update-menu-item.dto";
import { MenuItemServiceRepository } from "../../../infra/menu_item/services/menu-item.service.repository";

@injectable()
@registry([
  {
    token: "MenuItemRepository",
    useClass: MenuItemServiceRepository,
  },
])
export class UpdateMenuItemUseCase {
  constructor(
    @inject("MenuItemRepository")
    private readonly repository: MenuItemRepository
  ) {}

  async execute(
    id: string,
    data: Partial<UpdateMenuItemDTO>
  ): Promise<MenuItem> {
    const dto = new UpdateMenuItemDTO(data);
    const validation = dto.validate();

    if (!validation.isValid) {
      throw new Error(`Error de validación: ${validation.errors.join(", ")}`);
    }

    const existingItem = await this.repository.getById(id);
    if (!existingItem) {
      throw new Error(`Ítem de menú con ID ${id} no encontrado`);
    }

    const updateData: Partial<MenuItem> = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.price !== undefined) updateData.price = dto.price;
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl;
    if (dto.available !== undefined) updateData.available = dto.available;
    if (dto.preparationTime !== undefined)
      updateData.preparationTime = dto.preparationTime;
    if (dto.isVegetarian !== undefined)
      updateData.isVegetarian = dto.isVegetarian;
    if (dto.spicyLevel !== undefined) updateData.spicyLevel = dto.spicyLevel;
    if (dto.menuId !== undefined) updateData.menuId = dto.menuId;

    return this.repository.update(id, updateData);
  }
}
