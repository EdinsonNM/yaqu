import { injectable, inject, registry } from "tsyringe";
import { MenuItemRepository } from "../repositories/menu-item.repository";
import { MenuItem } from "../models/menu-item.model";
import { MenuItemServiceRepository } from "../../../infra/menu_item/services/menu-item.service.repository";

@injectable()
@registry([
  {
    token: "MenuItemRepository",
    useClass: MenuItemServiceRepository,
  },
])
export class GetAllMenuItemsUseCase {
  constructor(
    @inject("MenuItemRepository")
    private readonly repository: MenuItemRepository
  ) {}

  execute(): Promise<MenuItem[]> {
    return this.repository.getAll();
  }
}
