import { Edit, Trash2 } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import {
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableHead,
  TableHeader,
} from "@presentation/components/ui/table";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";

interface MenuItemsTableProps {
  menuItems: MenuItem[] | undefined;
  isLoading: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

export const MenuItemsTable = ({
  menuItems,
  isLoading,
  onEdit,
  onDelete,
}: MenuItemsTableProps) => {
  // Formatear precio como moneda
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}€`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Disponible</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              Cargando elementos del menú...
            </TableCell>
          </TableRow>
        ) : menuItems && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description || "-"}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>
                {item.available ? "Disponible" : "No disponible"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    aria-label={`Editar ${item.name}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)}
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              No hay elementos en este menú
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
