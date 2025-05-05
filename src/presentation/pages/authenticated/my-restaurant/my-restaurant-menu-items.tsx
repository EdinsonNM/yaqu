import { Edit, Trash2 } from "lucide-react";

import {
  TableCell,
  TableBody,
  TableRow,
  Table,
} from "@presentation/components/ui/table";

import { TableHeader } from "@presentation/components/ui/table";
import { Button } from "@presentation/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@presentation/components/ui/card";
import { TableHead } from "@presentation/components/ui/table";
import { PlusCircle } from "lucide-react";

export const MyRestaurantMenuItems = () => {
  const menuItems = [
    {
      id: 1,
      name: "Paella Valenciana",
      category: "Platos principales",
      price: "18.50€",
      description: "Arroz con mariscos y azafrán",
    },
    {
      id: 2,
      name: "Gazpacho",
      category: "Entrantes",
      price: "6.00€",
      description: "Sopa fría de tomate y verduras",
    },
    {
      id: 3,
      name: "Tarta de Santiago",
      category: "Postres",
      price: "5.50€",
      description: "Tarta de almendra tradicional",
    },
  ];
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
          <span>Añadir Plato</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
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
  );
};
