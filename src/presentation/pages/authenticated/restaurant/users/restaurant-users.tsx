import React, { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/presentation/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { Search } from "lucide-react";
import { Restaurant } from "@domain/restaurant/models/restaurant.model";
import { useUserRestaurantsByRestaurantId } from "@infra/user_restaurant/hooks/use-user-restaurants-by-restaurant-id";
import { useUserRestaurantCreate } from "@infra/user_restaurant/hooks/use-user-restaurant-create";
import { useUserRestaurantDelete } from "@infra/user_restaurant/hooks/use-user-restaurant-delete";
import { useGetByEmailUser } from "@infra/authentication/use-get-by-email-user";
import { User } from "@domain/authentication/models/user";
import { Skeleton } from "@presentation/components/ui/skeleton";

type RestaurantUsersProps = {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
};
export const RestaurantUsers = ({
  isOpen,
  onClose,
  restaurant,
}: RestaurantUsersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<User | null>(null);

  const { data: users = [], refetch } = useUserRestaurantsByRestaurantId(
    restaurant.id!
  );
  const { mutate: createUserRestaurant } = useUserRestaurantCreate();
  const { mutate: deleteUserRestaurant } = useUserRestaurantDelete();
  const { mutate: getByEmailUser, isPending, isIdle } = useGetByEmailUser();
  // Función para buscar usuarios
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    getByEmailUser(searchTerm, {
      onSuccess: (user) => {
        setSearchResult(user);
      },
      onError: () => {
        setSearchResult(null);
      },
    });
  };

  const handleAddUser = async (userId: string) => {
    createUserRestaurant(
      {
        userId,
        restaurantId: restaurant.id!,
      },
      {
        onSuccess: () => {
          refetch();
          setSearchResult(null);
          setSearchTerm("");
        },
      }
    );
  };

  const handleDeleteUser = async (userId: string) => {
    deleteUserRestaurant(
      { userId, restaurantId: restaurant.id! },
      { onSuccess: () => refetch() }
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buscar y Agregar Usuarios</DialogTitle>
          <DialogDescription>
            Busca usuarios por correo electrónico.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 my-2">
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={isPending}
            type="submit"
            size="icon"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {searchResult && !isPending && (
          <div className="max-h-60 overflow-y-auto">
            <Table>
              <TableBody>
                <TableRow key={searchResult.id}>
                  <TableCell>
                    {searchResult.fullName}
                    <br />
                    <span className="text-sm text-gray-500">
                      {searchResult.email}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleAddUser(searchResult.id!)}
                    >
                      Agregar
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        {isPending && (
          <p className="text-center py-2">
            {" "}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </p>
        )}
        {!isPending && searchTerm && !searchResult && !isIdle && (
          <p className="text-center py-2">No se encontraron usuarios</p>
        )}
        {/* Tabla de usuarios actuales */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.user!.id}>
                <TableCell>
                  {user.user!.fullName}
                  <br />
                  <span className="text-sm text-gray-500">
                    {user.user!.email}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user.user!.id!)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users?.length === 0 && (
          <p className="text-center py-4">
            No hay usuarios asignados a este restaurante
          </p>
        )}
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantUsers;
