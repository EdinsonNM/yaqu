import { injectable, inject, registry } from "tsyringe";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu.model";
import { MenuServiceRepository } from "../../../infra/menu/services/menu.service.repository";

@injectable()
@registry([
  {
    token: "MenuRepository",
    useClass: MenuServiceRepository,
  },
])
export class UploadMenuImageUseCase {
  constructor(
    @inject("MenuRepository")
    private readonly menuRepository: MenuRepository
  ) {}

  async execute(id: string, file: File): Promise<Menu> {
    return this.menuRepository.uploadMenuImage(id, file);
  }
}
