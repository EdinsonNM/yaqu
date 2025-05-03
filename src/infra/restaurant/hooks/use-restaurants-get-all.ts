import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetAllRestaurantsUseCase } from "../../../domain/restaurant/usecases/get-all-restaurants.usecase";

export const useRestaurantsGetAll = () => {
  const getAllRestaurantsUseCase = container.resolve(GetAllRestaurantsUseCase);

  return useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getAllRestaurantsUseCase.execute(),
  });
};
