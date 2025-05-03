import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { useForm } from "react-hook-form";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { restaurantSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

type RestaurantFormProps = {
  title: string;
  restaurant?: Restaurant;
  onClose: () => void;
  onSubmit: (data: Partial<Restaurant>) => void;
};

export function RestaurantForm({
  title,
  restaurant,
  onClose,
  onSubmit,
}: RestaurantFormProps) {
  const { register, handleSubmit } = useForm<Partial<Restaurant>>({
    defaultValues: restaurant,
    resolver: yupResolver(restaurantSchema(!!restaurant)),
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                {...register("name")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Dirección
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <input
                type="text"
                {...register("description")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                {...register("email")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="outline">
                Cancelar
              </Button>
              <Button
                variant="default"
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
