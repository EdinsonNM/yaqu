import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { DeleteRestaurantUseCase } from "../../../domain/restaurant/usecases/delete-restaurant.usecase";

export const useRestaurantDelete = () => {
  const deleteRestaurantUseCase = container.resolve(DeleteRestaurantUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRestaurantUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
