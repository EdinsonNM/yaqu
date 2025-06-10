import { useState } from "react";
import { Button } from "@presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@presentation/components/ui/dialog";
import { toast } from "sonner";
import { Commission } from "@domain/administration/models/commission";

interface DeleteCommissionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  commission: Commission | undefined;
  refetch: () => void;
}

const DeleteCommissionConfirmation = ({
  isOpen,
  onClose,
  commission,
  refetch,
}: DeleteCommissionConfirmationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!commission) return;

    setIsLoading(true);
    try {
      // Aquí iría la lógica para eliminar la comisión
      // await deleteCommission(commission.id);

      toast("La comisión se ha eliminado correctamente");

      refetch();
      onClose();
    } catch (error) {
      toast("No se pudo eliminar la comisión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Comisión</DialogTitle>
          <DialogDescription>
            ¿Está seguro que desea eliminar esta comisión? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {commission && (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Código:</span> {commission.code}
              </p>
              <p>
                <span className="font-medium">Nombre:</span> {commission.name}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommissionConfirmation;
