import { Modal, Button, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserDataForm from "../shared/user-data-form";
import { modalTheme } from "@presentation/components/themes/modal-theme";
import { useUpdateUser } from "@infra/authentication/use-update-user";
import { User } from "@domain/authentication/models/user";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { editSchema } from "../shared/user-form-edit.schema";

type UserFormEditProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  fetchUsers: () => void;
};

const UserFormEdit = ({
  isOpen,
  onClose,
  user,
  fetchUsers,
}: UserFormEditProps) => {
  const { mutate: updateUser, isPending, isError, error } = useUpdateUser();
  const form = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      fullName: user.fullName || "",
      roles: user.roles || [],
    },
  });

  // Actualizar el formulario cuando cambia el usuario
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || "",
        roles: user.roles || [],
      });
    }
  }, [user, form]);

  const onSubmit = (data: any) => {
    if (!user.id) return;
    
    updateUser(
      { 
        id: user.id, 
        userData: {
          fullName: data.fullName,
          roles: data.roles
        }
      }, 
      {
        onSuccess: () => {
          toast.success("Usuario actualizado correctamente");
          fetchUsers();
          onClose();
        },
        onError: (err) => {
          toast.error("Error al actualizar el usuario");
          console.error("Error updating user:", err);
        }
      }
    );
  };

  if (!isOpen) {
    return null;
  }

  // Determinar qué campos son editables
  const isFieldEditable = (field: string) => {
    // Solo permitimos editar el nombre y los roles
    // El email y las contraseñas no son editables
    if (field === "fullName" || field === "roles") {
      return true;
    }
    return false;
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl" theme={modalTheme}>
      <Modal.Header>Editar Usuario</Modal.Header>
      {isError && <Alert color="failure">{error!.message}</Alert>}
      <Modal.Body>
        <UserDataForm
          onSubmit={onSubmit}
          form={form as any}
          isFieldEditable={isFieldEditable}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="user-form"
          disabled={isPending}
          isProcessing={isPending}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormEdit;
