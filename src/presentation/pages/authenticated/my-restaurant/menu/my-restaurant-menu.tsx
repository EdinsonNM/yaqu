import { useState } from "react";
import { CardContent } from "@presentation/components/ui/card";
import { PlusCircle, Clock, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@presentation/components/ui/card";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { useMenusGetAll } from "@infra/menu/hooks/use-menus-get-all";
import { useMenuCreate } from "@infra/menu/hooks/use-menu-create";
import { useMenuDelete } from "@infra/menu/hooks/use-menu-delete";
import { useMenuToggleActive } from "@infra/menu/hooks/use-menu-toggle-active";
import { useMenuUpdate } from "@infra/menu/hooks/use-menu-update";
import { Menu } from "@domain/menu/models/menu.model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@presentation/components/ui/dialog";
import { Input } from "@presentation/components/ui/input";
import { Label } from "@presentation/components/ui/label";
import { Textarea } from "@presentation/components/ui/textarea";
import { Badge } from "@presentation/components/ui/badge";
import { Skeleton } from "@presentation/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Switch } from "@presentation/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@presentation/components/ui/tooltip";
import useModal from "@presentation/utils/hooks/use-modal";
import { MenuImageUpload } from "./menu-image-upload";

export const MyRestaurantMenu = () => {
  const navigate = useNavigate();
  const { currentRestaurant: restaurant } = useRestaurantStore();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [newMenu, setNewMenu] = useState<Partial<Menu>>({
    name: "",
    description: "",
    active: true,
    availableFrom: "",
    availableTo: "",
  });

  const {
    data: menus,
    isLoading,
    refetch,
  } = useMenusGetAll(restaurant?.id || "");
  const createMenuMutation = useMenuCreate();
  const deleteMenuMutation = useMenuDelete(restaurant?.id || "");
  const toggleActiveMutation = useMenuToggleActive(restaurant?.id || "");
  const updateMenuMutation = useMenuUpdate();
  const modalUpload = useModal();

  const handleOpenModalUpload = (menu: Menu) => {
    setCurrentMenu(menu);
    modalUpload.openModal();
  };

  const handleCreateMenu = async () => {
    if (!restaurant?.id) return;

    try {
      await createMenuMutation.mutateAsync({
        ...newMenu,
        restaurantId: restaurant.id,
      });
      setIsCreateDialogOpen(false);
      setNewMenu({
        name: "",
        description: "",
        active: true,
        availableFrom: "",
        availableTo: "",
      });
    } catch (error) {
      console.error("Error al crear el menú:", error);
    }
  };

  const handleDeleteMenu = async (id: string) => {
    modalUpload.openModal();
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await toggleActiveMutation.mutateAsync({
        id,
        active: !currentActive,
      });
    } catch (error) {
      console.error("Error al cambiar el estado del menú:", error);
    }
  };

  const navigateToMenuItems = (menuId: string) => {
    navigate(`/dashboard/mi-restaurante/menu/${menuId}`);
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return "No definido";
    return time;
  };

  const getDefaultMenuImage = () => {
    return "/default-menu.png";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Carta del Restaurante</CardTitle>
          <CardDescription>
            Gestiona los platos y bebidas que ofreces
          </CardDescription>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Añadir Carta</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva carta</DialogTitle>
              <DialogDescription>
                Añade una nueva carta a tu restaurante
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la carta</Label>
                <Input
                  id="name"
                  value={newMenu.name}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, name: e.target.value })
                  }
                  placeholder="Ej: Carta de Platos Principales"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newMenu.description || ""}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, description: e.target.value })
                  }
                  placeholder="Describe brevemente esta carta"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">URL de la imagen (opcional)</Label>
                <Input
                  id="imageUrl"
                  value={newMenu.imageUrl || ""}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, imageUrl: e.target.value })
                  }
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Deja en blanco para usar una imagen por defecto
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="availableFrom">Disponible desde</Label>
                  <Input
                    id="availableFrom"
                    type="time"
                    value={newMenu.availableFrom || ""}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, availableFrom: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="availableTo">Disponible hasta</Label>
                  <Input
                    id="availableTo"
                    type="time"
                    value={newMenu.availableTo || ""}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, availableTo: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateMenu} disabled={!newMenu.name}>
                Crear Carta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : menus?.length === 0 ? (
          <div className="text-center py-8">
            No hay cartas disponibles. Crea tu primera carta.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menus?.map((menu) => (
              <div
                key={menu.id}
                className="border rounded-lg overflow-hidden bg-card group cursor-pointer"
                onClick={() => navigateToMenuItems(menu.id!)}
              >
                <div className="h-40 overflow-hidden relative">
                  {menu.imageUrl ? (
                    <img
                      src={menu.imageUrl + `?r=${Date.now()}`}
                      alt={menu.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={getDefaultMenuImage()}
                      alt={menu.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={menu.active ? "default" : "outline"}
                      className={`${
                        menu.active
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-background/80 backdrop-blur-sm"
                      }`}
                    >
                      {menu.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <div
                    className="absolute bottom-2 right-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                            onClick={() => handleOpenModalUpload(menu)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cambiar imagen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{menu.name}</h3>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        className={`text-xs ${
                          menu.active
                            ? "text-green-600 font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {menu.active ? "Activo" : "Inactivo"}
                      </span>
                      <Switch
                        checked={menu.active}
                        onCheckedChange={() =>
                          handleToggleActive(menu.id!, menu.active!)
                        }
                      />
                    </div>
                  </div>
                  {menu.description && (
                    <p className="text-sm text-muted-foreground mt-1 mb-2">
                      {menu.description}
                    </p>
                  )}
                  {(menu.availableFrom || menu.availableTo) && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatTime(menu.availableFrom)} -{" "}
                        {formatTime(menu.availableTo)}
                      </span>
                    </div>
                  )}
                  <div
                    className="flex flex-wrap gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="outline" size="sm" className="h-8">
                      <Edit className="h-3.5 w-3.5 mr-1" /> Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteMenu(menu.id!)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {modalUpload.isOpen && (
        <MenuImageUpload
          isOpen={modalUpload.isOpen}
          onClose={modalUpload.closeModal}
          menu={currentMenu!}
          refetch={refetch}
        />
      )}
    </Card>
  );
};
