import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@presentation/components/ui/card";
import { Input } from "@presentation/components/ui/input";
import { Label } from "@presentation/components/ui/label";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { restaurantSchema } from "../../restaurant/components/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Textarea } from "@presentation/components/ui/textarea";
import { Button } from "@presentation/components/ui/button";
import { useForm } from "react-hook-form";

export default function MyRestaurantInfo() {
  const { currentRestaurant } = useRestaurantStore();

  const { register, handleSubmit, setValue } = useForm<Partial<Restaurant>>({
    resolver: yupResolver(restaurantSchema(false)),
    defaultValues: currentRestaurant ?? {},
  });

  useEffect(() => {
    if (currentRestaurant) {
      setValue("name", currentRestaurant.name);
      setValue("address", currentRestaurant.address);
      setValue("phone", currentRestaurant.phone);
      setValue("email", currentRestaurant.email);
      setValue("description", currentRestaurant.description);
    }
  }, [currentRestaurant]);

  const onSubmit = (data: Partial<Restaurant>) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Restaurante</CardTitle>
        <CardDescription>
          Gestiona los datos básicos de tu restaurante
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" {...register("address")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" {...register("description")} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Horario de apertura</Label>
            <Input id="hours" />
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
}
