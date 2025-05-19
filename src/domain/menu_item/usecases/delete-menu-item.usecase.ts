import { injectable, inject, registry } from "tsyringe";
import { MenuItemRepository } from "../repositories/menu-item.repository";
import { MenuItemServiceRepository } from "../../../infra/menu_item/services/menu-item.service.repository";

@injectable()
@registry([
  {
    token: "MenuItemRepository",
    useClass: MenuItemServiceRepository,
  },
])
export class DeleteMenuItemUseCase {
  constructor(
    @inject("MenuItemRepository")
    private readonly repository: MenuItemRepository
  ) {}

  async execute(id: string): Promise<void> {
    const existingItem = await this.repository.getById(id);
    if (!existingItem) {
      throw new Error(`Ítem de menú con ID ${id} no encontrado`);
    }

    return this.repository.delete(id);
  }
}
