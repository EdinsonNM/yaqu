import { injectable, inject, registry } from "tsyringe";
import { MenuRepository } from "../repositories/menu.repository";
import { MenuServiceRepository } from "../../../infra/menu/services/menu.service.repository";

@injectable()
@registry([
  {
    token: "MenuRepository",
    useClass: MenuServiceRepository,
  },
])
export class DeleteMenuUseCase {
  constructor(
    @inject("MenuRepository")
    private readonly repository: MenuRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
