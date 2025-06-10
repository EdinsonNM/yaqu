import React from "react";
import { Modal } from "flowbite-react";
import { useDeleteUser } from "@infra/authentication/use-delete-user";
import { User } from "@domain/authentication/models/user";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@presentation/components/ui/dialog";
import { Button } from "@presentation/components/ui/button";

interface DeleteUserConfirmationFormProps {
  isOpen: boolean;
  user?: User;
  onClose: () => void;
  refetch: () => void;
}

const DeleteUserConfirmationForm: React.FC<DeleteUserConfirmationFormProps> = ({
  isOpen,
  user,
  onClose,
  refetch,
}) => {
  const { mutate: deleteUser, isPending, error } = useDeleteUser();

  const handleDelete = () => {
    if (user?.id) {
      deleteUser(user.id, {
        onSuccess: () => {
          toast.success("Usuario eliminado correctamente");
          onClose();
          refetch();
        },
        onError: (err) => {
          toast.error("Error al eliminar el usuario");
          console.error("Error deleting user:", err);
        },
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>Confirmar Eliminación</DialogHeader>
      <DialogContent>
        <p>
          ¿Está seguro que deseas eliminar al usuario <b>{user.fullName}</b>?
          Esta acción no se puede deshacer.
        </p>
        {error && (
          <p className="text-red-600">
            Error al eliminar el usuario. Por favor, inténtelo de nuevo.
          </p>
        )}
      </DialogContent>
      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button onClick={handleDelete} disabled={isPending}>
          {isPending ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteUserConfirmationForm;
