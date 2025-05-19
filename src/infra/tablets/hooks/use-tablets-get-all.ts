import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetAllTabletsUseCase } from "../../../domain/tablets/usecases/get-all-tablets.usecase";

export const useTabletsGetAll = (restaurantId: string) => {
  const getAllTabletsUseCase = container.resolve(GetAllTabletsUseCase);

  return useQuery({
    queryKey: ["tablets", restaurantId],
    queryFn: () => getAllTabletsUseCase.execute(restaurantId),
    enabled: !!restaurantId,
  });
};
