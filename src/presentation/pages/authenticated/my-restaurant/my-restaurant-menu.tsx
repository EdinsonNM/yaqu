import { useState, useEffect } from "react";
import { CardContent } from "@presentation/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@presentation/components/ui/card";
import useRestaurantStore from "@presentation/store/restaurant-store";

// Definimos la interfaz para las cartas
interface MenuCard {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export const MyRestaurantMenu = () => {
  const { currentRestaurant: restaurant } = useRestaurantStore();
  const [menuCards, setMenuCards] = useState<MenuCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí deberías cargar las cartas desde tu API
    // Este es un ejemplo con datos de muestra
    if (restaurant?.id) {
      setLoading(true);
      // Reemplazar con tu llamada a API real
      // fetchMenuCards(restaurant.id).then(data => {
      //   setMenuCards(data);
      //   setLoading(false);
      // });

      // Datos de ejemplo
      setTimeout(() => {
        setMenuCards([
          {
            id: "1",
            name: "Carta de Platos de Fondo",
            category: "Platos principales",
            description: "Incluye platos como arroz, carnes y pescados.",
            imageUrl:
              "https://media.gettyimages.com/id/504754220/es/foto/c%C3%B3cteles.jpg?s=612x612&w=gi&k=20&c=0cjHHW1fOOBry3ky-9dVsjgSoS0vVfq6ma_UnBovVeg=",
          },
          {
            id: "2",
            name: "Carta de Tragos",
            category: "Bebidas",
            description: "Carta de cócteles y otras bebidas",
            imageUrl:
              "https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg?semt=ais_hybrid&w=740",
          },
          {
            id: "3",
            name: "Carta de Postres",
            category: "Postres",
            description: "Descripción de la carta de postres",
            imageUrl:
              "https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg?semt=ais_hybrid&w=740",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [restaurant?.id]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Carta del Restaurante</CardTitle>
          <CardDescription>
            Gestiona los platos y bebidas que ofreces
          </CardDescription>
        </div>
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Añadir Carta</span>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Cargando cartas...</div>
        ) : menuCards.length === 0 ? (
          <div className="text-center py-8">
            No hay cartas disponibles. Crea tu primera carta.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuCards.map((card) => (
              <div
                key={card.id}
                className="border rounded-lg overflow-hidden bg-black/5 dark:bg-white/5"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Categoría: {card.category}
                  </p>
                  <p className="text-sm mt-2">{card.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Ver Platos
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
