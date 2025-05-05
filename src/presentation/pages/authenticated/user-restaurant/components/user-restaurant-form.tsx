import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { useUserRestaurantCreate } from "@/infra/user_restaurant/hooks/use-user-restaurant-create";
import { useRestaurantsGetAll } from "@/infra/restaurant/hooks/use-restaurants-get-all";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";

type UserRestaurantFormProps = {
  userId: string;
  onClose: () => void;
};

export function UserRestaurantForm({
  userId,
  onClose,
}: UserRestaurantFormProps) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const { data: restaurants, isLoading } = useRestaurantsGetAll();
  const { mutate: createUserRestaurant, isPending } = useUserRestaurantCreate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRestaurantId) {
      createUserRestaurant(
        {
          userId,
          restaurantId: selectedRestaurantId,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Restaurante al Usuario</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg w-full max-w-md">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Seleccionar Restaurante
              </label>
              <select
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Seleccione un restaurante</option>
                {restaurants?.map((restaurant: Restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="outline">
                Cancelar
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={!selectedRestaurantId || isPending}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Asignar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
