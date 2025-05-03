import { useRestaurantCreate } from "@infra/restaurant/hooks/use-restaurant-create";
import { RestaurantForm } from "../components/restaurant-form";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
type RestaurantNewProps = {
  onClose: () => void;
  refetch: () => void;
};
export function RestaurantNew({ onClose, refetch }: RestaurantNewProps) {
  const { mutate: createRestaurant } = useRestaurantCreate();
  const handleSubmit = (data: Partial<Restaurant>) => {
    createRestaurant(data, {
      onSuccess: () => {
        refetch();
        onClose();
      },
    });
  };
  return (
    <RestaurantForm
      title="Nuevo Restaurante"
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
