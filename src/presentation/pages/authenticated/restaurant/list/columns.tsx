"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@presentation/components/molecules/table/DataTableColumnHeader";
import {
  TableActions,
  TableActionsObject,
} from "../../../../components/molecules/table/TableActions";

export const columns = <T,>(actions: TableActionsObject<T>) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "address",
      header: "Dirección",
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "logoUrl",
      header: "Logo URL",
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de Creación",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date;
        return createdAt ? new Date(createdAt).toLocaleDateString() : "-";
      },
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
