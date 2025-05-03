import { Modal, Button, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../shared/user-form.schema";
import UserDataForm from "../shared/user-data-form";

import { modalTheme } from "@presentation/components/themes/modal-theme";
import { useCreateUser } from "@infra/authentication/use-create-user";
import { User } from "@domain/authentication/models/user";

type UserFormNewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
};

const UserFormNewModal = ({
  isOpen,
  onClose,
  fetchUsers,
}: UserFormNewModalProps) => {
  const { mutate: createUser, isPending, isError, error } = useCreateUser();
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (data: any) => {
    const user = Object.assign(new User(), data);
    createUser(user, {
      onSuccess: () => {
        fetchUsers();
        onClose();
      },
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="xl" theme={modalTheme}>
      <Modal.Header>Registrar Nuevo Usuario</Modal.Header>
      {isError && <Alert color="failure">{error!.message}</Alert>}
      <Modal.Body>
        <UserDataForm
          onSubmit={onSubmit}
          form={form as any}
          isFieldEditable={() => true}
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
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormNewModal;