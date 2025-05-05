import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetUserRestaurantsByRestaurantIdUseCase } from "@domain/user_restaurant/usecases/get-user-restaurants-by-restaurant-id";

export const useUserRestaurantsByRestaurantId = (restaurantId: string) => {
  const usecase = container.resolve(GetUserRestaurantsByRestaurantIdUseCase);

  return useQuery({
    queryKey: ["user_restaurants", "user", restaurantId],
    queryFn: () => usecase.execute(restaurantId),
    enabled: !!restaurantId,
  });
};
