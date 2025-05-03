import { Edit3, Trash2 } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "@/components/ui/row-actions";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor('fullName', {
    header: 'Nombre Completo',
    cell: info => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('roles', {
    header: 'Rol',
    cell: info => info.getValue().join(', '),
    enableSorting: true,
  }),
  columnHelper.accessor('created_at', {
    header: 'Fecha de Creación',
    cell: info => dayjs(info.getValue()).format('DD/MM/YYYY HH:mm:ss'),
    enableSorting: true,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Acciones',
    cell: props => {
      const actions = [
        {
          label: "Editar",
          icon: Edit3,
          onClick: () => (props.table.options.meta as any).onEdit(props.row.original),
        },
        {
          label: "Eliminar",
          icon: Trash2,
          onClick: () => (props.table.options.meta as any).onDelete(props.row.original),
          className: "text-red-600 focus:text-red-600",
        },
      ];

      return <RowActions actions={actions} />;
    },
  }),
];
