import { Button } from "@presentation/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@presentation/components/ui/table";
import { TableHead } from "@presentation/components/ui/table";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Table } from "@presentation/components/ui/table";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@presentation/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useUserRestaurantsByRestaurantId } from "@infra/user_restaurant/hooks/use-user-restaurants-by-restaurant-id";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { User } from "@domain/authentication/models/user";
import { RoleLabel, RoleName } from "@domain/authentication/enums/role.enum";
export function MyRestaurantUsers() {
  const { currentRestaurant } = useRestaurantStore();
  const { data: userRestaurants = [] } = useUserRestaurantsByRestaurantId(
    currentRestaurant!.id!
  );
  const users: User[] =
    userRestaurants?.map((userRestaurant) => userRestaurant.user!) ?? [];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usuarios del Restaurante</CardTitle>
          <CardDescription>
            Gestiona los usuarios que tienen acceso a tu restaurante
          </CardDescription>
        </div>
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Añadir Usuario</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>
                  {user.roles
                    ?.map((role) => RoleLabel[role as RoleName])
                    .join(", ")}
                </TableCell>
                <TableCell>{user.email}</TableCell>
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
}
