import { injectable, inject, registry } from "tsyringe";
import { TabletRepository } from "../repositories/tablet.repository";
import { TabletServiceRepository } from "../../../infra/tablets/services/tablet.service.repository";

@injectable()
@registry([
  {
    token: "TabletRepository",
    useClass: TabletServiceRepository,
  },
])
export class DeleteTabletUseCase {
  constructor(
    @inject("TabletRepository")
    private readonly repository: TabletRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
