import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetRestaurantByIdUseCase } from "../../../domain/restaurant/usecases/get-restaurant-by-id.usecase";

export const useRestaurantGetById = (id: string) => {
  const getRestaurantByIdUseCase = container.resolve(GetRestaurantByIdUseCase);

  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => getRestaurantByIdUseCase.execute(id),
    enabled: !!id,
  });
};
