import { RestaurantForm } from "../components/restaurant-form";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { useRestaurantUpdate } from "@infra/restaurant/hooks/use-restaurant-update";
type RestaurantEditProps = {
  onClose: () => void;
  refetch: () => void;
  restaurant: Restaurant;
};
export function RestaurantEdit({
  onClose,
  refetch,
  restaurant,
}: RestaurantEditProps) {
  const { mutate: updateRestaurant } = useRestaurantUpdate(restaurant.id!);
  const handleSubmit = (data: Partial<Restaurant>) => {
    updateRestaurant(data, {
      onSuccess: () => {
        refetch();
        onClose();
      },
    });
  };
  return (
    <RestaurantForm
      title="Editar Restaurante"
      onClose={onClose}
      onSubmit={handleSubmit}
      restaurant={restaurant}
    />
  );
}
