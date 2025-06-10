import { Edit3, Trash2 } from "lucide-react";
import { RowActions } from "@/components/ui/row-actions";
import dayjs from "dayjs";
import {
  TableActions,
  TableActionsObject,
} from "@presentation/components/molecules/table/TableActions";
import { ColumnDef } from "@tanstack/react-table";
import { RoleLabel } from "@domain/authentication/enums/role.enum";

export const columns = <T,>(actions: TableActionsObject<T>) => {
  return [
    {
      accessorKey: "fullName",
      header: "Nombre Completo",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "roles",
      header: "Rol",
      cell: (info) =>
        (info.getValue() as string[])
          .map((role) => RoleLabel[role as keyof typeof RoleLabel])
          .join(", "),
      enableSorting: true,
    },
    {
      accessorKey: "created_at",
      header: "Fecha de Creación",
      cell: (info) =>
        dayjs(info.getValue() as string | Date).format("DD/MM/YYYY HH:mm:ss"),
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original as T;
        return <TableActions actions={actions} item={item} />;
      },
    },
  ] as ColumnDef<T>[];
};
