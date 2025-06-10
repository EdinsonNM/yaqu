import { ColumnDef } from "@tanstack/react-table";
import { Parcel } from "../models/parcel.model";
import { TableActionsObject } from "@presentation/components/molecules/table/TableActions";
import { Badge } from "@presentation/components/ui/badge";

export const columns = (actions: TableActionsObject<Parcel>): ColumnDef<Parcel>[] => [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Predio",
  },
  {
    accessorKey: "userName",
    header: "Usuario",
  },
  {
    accessorKey: "participationStatus",
    header: "Estado Predio",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "outline" : "secondary"}
          className={
            status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100"
          }
        >
          {status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Área",
    cell: ({ row }) => {
      const area = parseFloat(row.getValue("area"));
      return <div>{area.toFixed(2)} ha</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => actions.render(row.original),
  },
];
