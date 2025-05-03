import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizes?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizes = [5, 10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-between px-2 space-y-4 sm:flex-row sm:space-y-0">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Filas por página</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizes.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full sm:w-auto items-center justify-between text-sm font-medium">
        <button
          className="px-2 py-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span className="hidden sm:inline">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <button
          className="px-2 py-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
