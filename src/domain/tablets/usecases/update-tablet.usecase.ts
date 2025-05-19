import { injectable, inject, registry } from "tsyringe";
import { TabletRepository } from "../repositories/tablet.repository";
import { Tablet } from "../models/tablet.model";
import { TabletServiceRepository } from "../../../infra/tablets/services/tablet.service.repository";

@injectable()
@registry([
  {
    token: "TabletRepository",
    useClass: TabletServiceRepository,
  },
])
export class UpdateTabletUseCase {
  constructor(
    @inject("TabletRepository")
    private readonly repository: TabletRepository
  ) {}

  execute(id: string, data: Partial<Tablet>): Promise<Tablet> {
    return this.repository.update(id, data);
  }
}
