import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateRestaurantUseCase } from "../../../domain/restaurant/usecases/update-restaurant.usecase";
import { Restaurant } from "../../../domain/restaurant/models/restaurant.model";

export const useRestaurantUpdate = (id: string) => {
  const updateRestaurantUseCase = container.resolve(UpdateRestaurantUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Restaurant>) =>
      updateRestaurantUseCase.execute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants", id] });
    },
  });
};
