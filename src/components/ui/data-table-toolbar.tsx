import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Input } from "./input";
import { Button } from "./button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns: {
    id: string;
    title: string;
  }[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  showPageSize?: boolean;
  pageSizes?: number[];
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  showPageSize = false,
  pageSizes = [5, 10, 20, 30, 40, 50, 100],
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-row items-center justify-between py-4 gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en todos los campos..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full md:w-[300px] pl-8"
          />
        </div>
        {globalFilter && (
          <Button
            variant="ghost"
            onClick={() => setGlobalFilter("")}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:mt-0">
       
        {showPageSize && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden md:block">Filas por página</span>
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
        )}
      </div>
    </div>
  );
}
