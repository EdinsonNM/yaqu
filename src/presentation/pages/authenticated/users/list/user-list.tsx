import { Button } from "@presentation/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { columns } from "./columns";
import useModal from "@presentation/utils/hooks/use-modal";
import { useState } from "react";
import { useListUsers } from "@infra/authentication/use-list-users";
import UserFormNewModal from "../new/user-new";
import DeleteUserConfirmationForm from "../delete/user-delete";
import UserFormEdit from "../edit/user-edit";
import { User } from "@domain/authentication/models/user";
import { RoleLabel, RoleName } from "@domain/authentication/enums/role.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { DataTable } from "@presentation/components/molecules/table/DataTable";
import { TableActionsObject } from "@presentation/components/molecules/table/TableActions";

// Roles ordenados según especificación

const UserList = () => {
  const modalNewUser = useModal();
  const modalEditUser = useModal();
  const modalDeleteUser = useModal();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedRole, setSelectedRole] = useState<string>(
    RoleName.SUPER_ADMIN
  );
  const { data, isLoading, refetch } = useListUsers(selectedRole);

  const actions: TableActionsObject<User> = {
    edit: {
      label: "Editar",
      icon: <Edit />,
      onClick: (user: User) => {
        setSelectedUser(user);
        modalEditUser.openModal();
      },
    },
    delete: {
      label: "Eliminar",
      icon: <Trash />,
      onClick: (user: User) => {
        setSelectedUser(user);
        modalDeleteUser.openModal();
      },
    },
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filtrar por rol:</span>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RoleName).map((role) => (
                <SelectItem key={role} value={role}>
                  {RoleLabel[role]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        data={data || []}
        columns={columns(actions)}
        onAdd={() => modalNewUser.openModal()}
      />
      {/* User forms for create/edit/delete operations */}
      {modalNewUser.isOpen && (
        <UserFormNewModal
          isOpen={modalNewUser.isOpen}
          onClose={modalNewUser.closeModal}
          fetchUsers={refetch}
        />
      )}
      {modalEditUser.isOpen && (
        <UserFormEdit
          isOpen={modalEditUser.isOpen}
          onClose={modalEditUser.closeModal}
          user={selectedUser!}
          fetchUsers={refetch}
        />
      )}
      {modalDeleteUser.isOpen && (
        <DeleteUserConfirmationForm
          isOpen={modalDeleteUser.isOpen}
          onClose={modalDeleteUser.closeModal}
          user={selectedUser}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UserList;
