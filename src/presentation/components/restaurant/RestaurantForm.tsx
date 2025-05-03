import React, { useState, useEffect } from "react";
import { Restaurant } from "../../../domain/restaurant/models/restaurant.model";
import { CreateRestaurantDTO } from "../../../domain/restaurant/dtos/create-restaurant.dto";
import { UpdateRestaurantDTO } from "../../../domain/restaurant/dtos/update-restaurant.dto";

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSubmit: (data: CreateRestaurantDTO | UpdateRestaurantDTO) => void;
  isLoading?: boolean;
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({
  restaurant,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    logoUrl: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        description: restaurant.description || "",
        address: restaurant.address || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        logoUrl: restaurant.logoUrl || "",
      });
    }
  }, [restaurant]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (restaurant) {
      // Si estamos editando, solo enviamos los campos que han cambiado
      const changedData: UpdateRestaurantDTO = {};

      if (formData.name !== restaurant.name) changedData.name = formData.name;
      if (formData.description !== restaurant.description)
        changedData.description = formData.description;
      if (formData.address !== restaurant.address)
        changedData.address = formData.address;
      if (formData.phone !== restaurant.phone)
        changedData.phone = formData.phone;
      if (formData.email !== restaurant.email)
        changedData.email = formData.email;
      if (formData.logoUrl !== restaurant.logoUrl)
        changedData.logoUrl = formData.logoUrl;

      onSubmit(changedData);
    } else {
      // Si estamos creando, enviamos todos los datos
      onSubmit(new CreateRestaurantDTO(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL del Logo
        </label>
        <input
          type="url"
          name="logoUrl"
          value={formData.logoUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : restaurant ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
};
