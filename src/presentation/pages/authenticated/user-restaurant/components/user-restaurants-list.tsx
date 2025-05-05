import { useUserRestaurantsByUserId } from "@/infra/user_restaurant/hooks/use-user-restaurants-by-user-id";
import { useUserRestaurantDelete } from "@/infra/user_restaurant/hooks/use-user-restaurant-delete";
import { Button } from "@/presentation/components/ui/button";
import { useState } from "react";
import { UserRestaurantForm } from "./user-restaurant-form";

type UserRestaurantsListProps = {
  userId: string;
};

export function UserRestaurantsList({ userId }: UserRestaurantsListProps) {
  const [showForm, setShowForm] = useState(false);
  const { data: userRestaurants, isLoading } =
    useUserRestaurantsByUserId(userId);
  const { mutate: deleteUserRestaurant } = useUserRestaurantDelete();

  const handleDelete = (restaurantId: string) => {
    if (confirm("¿Estás seguro de eliminar esta asignación?")) {
      deleteUserRestaurant({ userId, restaurantId });
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Restaurantes Asignados</h2>
        <Button onClick={() => setShowForm(true)}>Asignar Restaurante</Button>
      </div>

      {userRestaurants && userRestaurants.length > 0 ? (
        <div className="grid gap-4">
          {userRestaurants.map((userRestaurant) => (
            <div
              key={`${userRestaurant.userId}-${userRestaurant.restaurantId}`}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p>ID Restaurante: {userRestaurant.restaurantId}</p>
                <p className="text-sm text-gray-500">
                  Asignado: {userRestaurant.createdAt?.toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(userRestaurant.restaurantId!)}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay restaurantes asignados a este usuario.</p>
      )}

      {showForm && (
        <UserRestaurantForm
          userId={userId}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
