import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import useModal from "@presentation/utils/hooks/use-modal";
import { useState } from "react";
import { useListUsers } from "@infra/authentication/use-list-users";
import UserFormNewModal from "../new/user-new";
import DeleteUserConfirmationForm from "../delete/user-delete";
import UserFormEdit from "../edit/user-edit";
import { User } from "@domain/authentication/models/user";
import { Role } from "@domain/authentication/enums/role.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Roles ordenados según especificación
const ORDERED_ROLES = [Role.admin, Role.teacher, Role.guardian];

const UserList = () => {
  const modalNewUser = useModal();
  const modalEditUser = useModal();
  const modalDeleteUser = useModal();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedRole, setSelectedRole] = useState<string>(Role.admin);
  const { data, isLoading, refetch } = useListUsers(selectedRole);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    modalEditUser.openModal();
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    modalDeleteUser.openModal();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <Button onClick={modalNewUser.openModal}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filtrar por rol:</span>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {ORDERED_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        data={data || []}
        columns={columns as any}
        loading={isLoading}
        searchableColumns={[
          {
            id: "full_name",
            title: "Nombre",
          },
          {
            id: "email",
            title: "Email",
          },
          {
            id: "roles",
            title: "Rol",
          },
        ]}
        pagination
        meta={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />
      {/* User forms for create/edit/delete operations */}
      {modalNewUser.isOpen && (
        <UserFormNewModal
          isOpen={modalNewUser.isOpen}
          onClose={modalNewUser.closeModal}
          fetchUsers={refetch}
        />
      )}
      {selectedUser && (
        <>
          <UserFormEdit
            isOpen={modalEditUser.isOpen}
            onClose={modalEditUser.closeModal}
            user={selectedUser}
            fetchUsers={refetch}
          />
          <DeleteUserConfirmationForm
            isOpen={modalDeleteUser.isOpen}
            onClose={modalDeleteUser.closeModal}
            user={selectedUser}
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
