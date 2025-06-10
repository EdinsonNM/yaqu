import { ColumnDef } from "@tanstack/react-table";
import { WaterUser } from "@domain/water-users/models/water-user.model";
import dayjs from "dayjs";
import {
  TableActions,
  TableActionsObject,
} from "@presentation/components/molecules/table/TableActions";

export const columns = <T extends WaterUser>(actions: TableActionsObject<T>) => {
  return [
    {
      accessorKey: "ildUsuario",
      header: "ID",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "fullName",
      header: "Nombre Completo",
      cell: (info) => {
        const waterUser = info.row.original;
        return `${waterUser.vNombres} ${waterUser.vApePaterno} ${waterUser.vApeMaterno || ""}`.trim();
      },
      enableSorting: true,
    },
    {
      accessorKey: "vDni",
      header: "DNI",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "vRuc",
      header: "RUC",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "vTelefono",
      header: "Teléfono",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "vEmail",
      header: "Email",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "cEstado",
      header: "Estado",
      cell: (info) => {
        const estado = info.getValue() as string;
        if (estado === "A") return "Activo";
        if (estado === "I") return "Inactivo";
        return estado || "-";
      },
      enableSorting: true,
    },
    {
      accessorKey: "dFechaRegistro",
      header: "Fecha de Registro",
      cell: (info) => {
        const date = info.getValue() as Date | undefined;
        return date ? dayjs(date).format("DD/MM/YYYY") : "-";
      },
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
