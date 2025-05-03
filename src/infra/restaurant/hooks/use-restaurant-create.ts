import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { CreateRestaurantUseCase } from "../../../domain/restaurant/usecases/create-restaurant.usecase";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";

export const useRestaurantCreate = () => {
  const createRestaurantUseCase = container.resolve(CreateRestaurantUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Restaurant>) =>
      createRestaurantUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
