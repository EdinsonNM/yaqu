import { ArrowLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@presentation/components/ui/card";
import { useEffect, useState } from "react";
import { useMenusGetAll } from "@infra/menu/hooks/use-menus-get-all";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Menu } from "@domain/menu/models/menu.model";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";
import { useMenuItemsGetByMenuId } from "@infra/menu_item/hooks/use-menu-items-get-by-menu-id";
import { Toaster } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@presentation/components/ui/breadcrumb";

// Componentes modularizados
import { MenuNavigation } from "@presentation/pages/authenticated/my-restaurant/menu/menu-items/menu-navigation";
import { MenuItemsTable } from "@presentation/pages/authenticated/my-restaurant/menu/menu-items/menu-items-table";
import { AddMenuItemDialog } from "@presentation/pages/authenticated/my-restaurant/menu/menu-items/add-menu-item-dialog";
import { EditMenuItemDialog } from "@presentation/pages/authenticated/my-restaurant/menu/menu-items/edit-menu-item-dialog";
import { DeleteMenuItemDialog } from "@presentation/pages/authenticated/my-restaurant/menu/menu-items/delete-menu-item-dialog";
import useModal from "@presentation/utils/hooks/use-modal";

export const MyRestaurantMenuItems = () => {
  // Estado y datos
  const { currentRestaurant: restaurant } = useRestaurantStore();
  const { data: menus } = useMenusGetAll(restaurant?.id || "");
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<Menu | null>(null);
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);
  const { data: menuItems, isLoading } = useMenuItemsGetByMenuId(
    selectedCard?.id || ""
  ) as {
    data: MenuItem[] | undefined;
    isLoading: boolean;
  };

  // Estados para diálogos
  const modalNew = useModal();
  const modalEdit = useModal();
  const modalDelete = useModal();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  // Inicialización: seleccionar menú basado en URL
  useEffect(() => {
    if (menus && menus.length > 0) {
      const menuIndex = menuId
        ? menus.findIndex((menu) => menu.id === menuId)
        : 0;

      setCurrentMenuIndex(menuIndex >= 0 ? menuIndex : 0);
      setSelectedCard(menus[menuIndex >= 0 ? menuIndex : 0]);
    }
  }, [menus, menuId]);

  // Navegación entre menús
  const handlePrevMenu = () => {
    if (!menus || menus.length <= 1) return;

    const newIndex = (currentMenuIndex - 1 + menus.length) % menus.length;
    setCurrentMenuIndex(newIndex);
    setSelectedCard(menus[newIndex]);
    navigate(`/dashboard/mi-restaurante/menu/${menus[newIndex].id}`);
  };

  const handleNextMenu = () => {
    if (!menus || menus.length <= 1) return;

    const newIndex = (currentMenuIndex + 1) % menus.length;
    setCurrentMenuIndex(newIndex);
    setSelectedCard(menus[newIndex]);
    navigate(`/dashboard/mi-restaurante/menu/${menus[newIndex].id}`);
  };

  // Manejadores para operaciones CRUD
  const handleOpenAddDialog = () => {
    if (!selectedCard) return;
    modalNew.openModal();
  };

  const handleOpenEditDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    modalEdit.openModal();
  };

  const handleOpenDeleteDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    modalDelete.openModal();
  };

  return (
    <div className="space-y-4">
      <Toaster position="top-right" richColors />

      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/mi-restaurante/menu" asChild>
              <NavLink to="/dashboard/mi-restaurante/menu">Cartas</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              {selectedCard?.name || "Detalles de carta"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Botón Volver */}
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2"
        onClick={() => navigate("/dashboard/mi-restaurante/menu")}
        aria-label="Volver a listado de cartas"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a listado de cartas
      </Button>

      <Card>
        <CardContent>
          {/* Componente de navegación entre menús */}
          <Card className="mb-6 relative">
            <MenuNavigation
              selectedMenu={selectedCard}
              menus={menus}
              currentIndex={currentMenuIndex}
              onPrevMenu={handlePrevMenu}
              onNextMenu={handleNextMenu}
            />
          </Card>

          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Carta del Restaurante</CardTitle>
              <CardDescription>
                Gestiona los platos y bebidas que ofreces
              </CardDescription>
            </div>
            <Button
              className="flex items-center gap-1"
              onClick={handleOpenAddDialog}
              disabled={!selectedCard}
              aria-label="Añadir nuevo plato"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Añadir Plato</span>
            </Button>
          </CardHeader>

          {/* Tabla de elementos de menú */}
          <MenuItemsTable
            menuItems={menuItems}
            isLoading={isLoading}
            onEdit={handleOpenEditDialog}
            onDelete={handleOpenDeleteDialog}
          />
        </CardContent>
      </Card>

      {/* Diálogos para CRUD */}
      {modalNew.isOpen && (
        <AddMenuItemDialog
          isOpen={modalNew.isOpen}
          onOpenChange={modalNew.closeModal}
          menuId={selectedCard?.id || ""}
        />
      )}

      {modalEdit.isOpen && (
        <EditMenuItemDialog
          isOpen={modalEdit.isOpen}
          onOpenChange={modalEdit.closeModal}
          menuItem={selectedMenuItem}
        />
      )}

      {modalDelete.isOpen && (
        <DeleteMenuItemDialog
          isOpen={modalDelete.isOpen}
          onOpenChange={modalDelete.closeModal}
          menuItem={selectedMenuItem}
        />
      )}
    </div>
  );
};
