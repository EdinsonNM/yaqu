import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import { Button } from "@/presentation/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import useRestaurantStore from "@presentation/store/restaurant-store";
import MyRestaurantInfo from "./my-restaurant-info";
import { MyRestaurantUsers } from "./my-restaurant-users";
import { MyRestaurantMenu } from "./my-restaurant-menu";

const MyRestaurant = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { currentRestaurant } = useRestaurantStore();

  if (!currentRestaurant) {
    return <div>No hay restaurante seleccionado</div>;
  }

  const tables = [
    { id: 1, name: "Mesa 1", capacity: 4, location: "Interior" },
    { id: 2, name: "Mesa 2", capacity: 2, location: "Interior" },
    { id: 3, name: "Mesa 3", capacity: 6, location: "Terraza" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Mi Restaurante:{" "}
        <span className="font-normal">{currentRestaurant.name}</span>
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="menu">Carta</TabsTrigger>
          <TabsTrigger value="tables">Mesas</TabsTrigger>
        </TabsList>

        {/* Sección de Información del Restaurante */}
        <TabsContent value="info">
          <MyRestaurantInfo />
        </TabsContent>

        {/* Sección de Usuarios */}
        <TabsContent value="users">
          <MyRestaurantUsers />
        </TabsContent>

        {/* Sección de Carta/Menú */}
        <TabsContent value="menu">
          <MyRestaurantMenu />
        </TabsContent>

        {/* Sección de Mesas */}
        <TabsContent value="tables">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mesas del Restaurante</CardTitle>
                <CardDescription>
                  Gestiona las mesas disponibles en tu local
                </CardDescription>
              </div>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Añadir Mesa</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Capacidad</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell className="font-medium">
                        {table.name}
                      </TableCell>
                      <TableCell>{table.capacity} personas</TableCell>
                      <TableCell>{table.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyRestaurant;
