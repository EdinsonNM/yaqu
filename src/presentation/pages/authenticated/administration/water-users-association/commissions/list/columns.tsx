import { ColumnDef } from "@tanstack/react-table";
import { Commission } from "@domain/administration/models/commission";
import dayjs from "dayjs";
import {
  TableActions,
  TableActionsObject,
} from "@presentation/components/molecules/table/TableActions";

export const columns = <T extends Commission>(
  actions: TableActionsObject<T>,
  onShowDetails: (item: T) => void
) => {
  return [
    {
      accessorKey: "code",
      header: "Código",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: (info) => {
        const row = info.row?.original as T;
        return (
          <button
            className="text-black dark:text-white hover:underline"
            onClick={() => onShowDetails(row)}
          >
            {String(info.getValue() ?? "")}
          </button>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "location",
      header: "Ubicación",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "contactPhone",
      header: "Teléfono",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
    },
    {
      accessorKey: "createdAt",
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
