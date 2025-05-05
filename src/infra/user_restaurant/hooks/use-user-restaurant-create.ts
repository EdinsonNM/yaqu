import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UserRestaurant } from "../../../domain/user_restaurant/models/user-restaurant.model";
import { CreateUserRestaurantUseCase } from "@domain/user_restaurant/usecases/create-user-restaurant.usecase";

export const useUserRestaurantCreate = () => {
  const usecase = container.resolve(CreateUserRestaurantUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserRestaurant>) => usecase.execute(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user_restaurants"] });
      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: ["user_restaurants", "user", variables.userId],
        });
      }
      if (variables.restaurantId) {
        queryClient.invalidateQueries({
          queryKey: ["user_restaurants", "restaurant", variables.restaurantId],
        });
      }
    },
  });
};
