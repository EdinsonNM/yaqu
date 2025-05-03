import React from "react";
import { Restaurant } from "../../../domain/restaurant/models/restaurant.model";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit?: (restaurant: Restaurant) => void;
  onDelete?: (id: string) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {restaurant.logoUrl && (
        <div className="mb-3">
          <img
            src={restaurant.logoUrl}
            alt={`Logo de ${restaurant.name}`}
            className="w-full h-40 object-cover rounded"
          />
        </div>
      )}

      <h3 className="text-xl font-bold">{restaurant.name}</h3>

      {restaurant.description && (
        <p className="text-gray-600 mt-2">{restaurant.description}</p>
      )}

      {restaurant.address && (
        <div className="mt-2">
          <strong>Dirección:</strong> {restaurant.address}
        </div>
      )}

      {restaurant.phone && (
        <div className="mt-1">
          <strong>Teléfono:</strong> {restaurant.phone}
        </div>
      )}

      {restaurant.email && (
        <div className="mt-1">
          <strong>Email:</strong> {restaurant.email}
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(restaurant)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Editar
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(restaurant.id!)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
