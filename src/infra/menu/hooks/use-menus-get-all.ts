import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetAllMenusUseCase } from "../../../domain/menu/usecases/get-all-menus.usecase";

export const useMenusGetAll = (restaurantId: string) => {
  const getAllMenusUseCase = container.resolve(GetAllMenusUseCase);

  return useQuery({
    queryKey: ["menus", restaurantId],
    queryFn: () => getAllMenusUseCase.execute(restaurantId),
    enabled: !!restaurantId,
  });
};
