import React from "react";
import { Modal } from "flowbite-react";
import { useDeleteUser } from "@infra/authentication/use-delete-user";
import { User } from "@domain/authentication/models/user";
import { toast } from "react-toastify";
import { modalTheme } from "@presentation/components/themes/modal-theme";

interface DeleteUserConfirmationFormProps {
  isOpen: boolean;
  user?: User;
  onClose: () => void;
  refetch: () => void;
}

const DeleteUserConfirmationForm: React.FC<
  DeleteUserConfirmationFormProps
> = ({ isOpen, user, onClose, refetch }) => {
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
        }
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Modal show={isOpen} onClose={onClose} theme={modalTheme}>
      <Modal.Header>Confirmar Eliminación</Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que deseas eliminar al usuario{" "}
          <b>
            {user.fullName}
          </b>
          ? Esta acción no se puede deshacer.
        </p>
        {error && (
          <p className="text-red-600">
            Error al eliminar el usuario. Por favor, inténtelo de nuevo.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          disabled={isPending}
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          disabled={isPending}
        >
          {isPending ? "Eliminando..." : "Eliminar"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserConfirmationForm;
