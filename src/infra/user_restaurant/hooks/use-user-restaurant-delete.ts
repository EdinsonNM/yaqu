import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { DeleteUserRestaurantUseCase } from "../../../domain/user_restaurant/usecases/delete-user-restaurant.usecase";

export const useUserRestaurantDelete = () => {
  const deleteUserRestaurantUseCase = container.resolve(
    DeleteUserRestaurantUseCase
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      restaurantId,
    }: {
      userId: string;
      restaurantId: string;
    }) => deleteUserRestaurantUseCase.execute(userId, restaurantId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user_restaurants"] });
      queryClient.invalidateQueries({
        queryKey: ["user_restaurants", "user", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_restaurants", "restaurant", variables.restaurantId],
      });
    },
  });
};
