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
export class CreateTabletUseCase {
  constructor(
    @inject("TabletRepository")
    private readonly repository: TabletRepository
  ) {}

  execute(data: Partial<Tablet>): Promise<Tablet> {
    return this.repository.create(data);
  }
}
