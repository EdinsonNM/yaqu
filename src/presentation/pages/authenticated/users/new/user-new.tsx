import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../shared/user-form.schema";
import UserDataForm from "../shared/user-data-form";

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
    <UserDataForm
      onSubmit={onSubmit}
      form={form as any}
      isFieldEditable={() => true}
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Nuevo Usuario"
    />
  );
};

export default UserFormNewModal;
