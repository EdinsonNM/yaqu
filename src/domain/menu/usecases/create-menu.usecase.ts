import { injectable, inject, registry } from "tsyringe";
import { MenuRepository } from "../repositories/menu.repository";
import { MenuServiceRepository } from "../../../infra/menu/services/menu.service.repository";
import { Menu } from "../models/menu.model";

@injectable()
@registry([
  {
    token: "MenuRepository",
    useClass: MenuServiceRepository,
  },
])
export class CreateMenuUseCase {
  constructor(
    @inject("MenuRepository")
    private readonly repository: MenuRepository
  ) {}

  execute(data: Partial<Menu>): Promise<Menu> {
    return this.repository.create(data);
  }
}
