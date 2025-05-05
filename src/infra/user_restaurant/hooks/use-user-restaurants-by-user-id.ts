import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetUserRestaurantsByUserIdUseCase } from "../../../domain/user_restaurant/usecases/get-user-restaurants-by-user-id.usecase";

export const useUserRestaurantsByUserId = (userId: string) => {
  const getUserRestaurantsByUserIdUseCase = container.resolve(
    GetUserRestaurantsByUserIdUseCase
  );

  return useQuery({
    queryKey: ["user_restaurants", "user", userId],
    queryFn: () => getUserRestaurantsByUserIdUseCase.execute(userId),
    enabled: !!userId,
  });
};
