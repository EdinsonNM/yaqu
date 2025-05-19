import { useMenuItemDelete } from "@infra/menu_item/hooks/use-menu-item-delete";
import { toast } from "sonner";
import { Button } from "@presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@presentation/components/ui/dialog";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";

interface DeleteMenuItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem | null;
}

export const DeleteMenuItemDialog = ({
  isOpen,
  onOpenChange,
  menuItem,
}: DeleteMenuItemDialogProps) => {
  const { mutate: deleteMenuItem, isPending: isDeleting } = useMenuItemDelete();

  const handleDelete = () => {
    if (!menuItem?.id) return;

    deleteMenuItem(menuItem.id, {
      onSuccess: () => {
        toast.success("Plato eliminado correctamente");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(`Error al eliminar el plato: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar plato</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar "{menuItem?.name}"? Esta acción
            no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="Confirmar eliminación"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
