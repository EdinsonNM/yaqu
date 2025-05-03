import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataTableToolbar } from "./data-table-toolbar";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  pageSize?: number;
  pageSizes?: number[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  meta?: Record<string, unknown>;
  autoAdjustHeight?: boolean;
  showSearch?: boolean;
  loading?: boolean;
  reduceHeight?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = false,
  pageSize = 20,
  pageSizes = [20, 30, 40, 50, 100],
  searchableColumns = [],
  meta,
  autoAdjustHeight = false,
  showSearch = true,
  loading = false,
  reduceHeight = 360,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: pagination ? pageSize : Number.MAX_SAFE_INTEGER,
      },
    },
    meta,
  });

  const getSortingIcon = (sorted: false | "desc" | "asc") => {
    if (!sorted) return <ChevronsUpDown className="h-4 w-4" />;
    if (sorted === "desc") return <ChevronDown className="h-4 w-4" />;
    return <ChevronUp className="h-4 w-4" />;
  };
  const styleMaxHeight = autoAdjustHeight
    ? { maxHeight: `calc(100vh - ${reduceHeight}px)`, overflowY: "auto" }
    : { height: `calc(100vh - ${reduceHeight}px)` };

  const styleMaxHeightScroll = autoAdjustHeight
    ? { maxHeight: `calc(100vh - ${reduceHeight + 40}px)`, overflowY: "auto" }
    : { height: `calc(100vh - ${reduceHeight + 40}px)` };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-4">Cargando datos...</div>
      ) : (
        <>
          {showSearch && (
            <DataTableToolbar
              table={table}
              searchableColumns={searchableColumns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              showPageSize={pagination}
              pageSizes={pageSizes}
            />
          )}
          <div className="rounded-lg border bg-card shadow-sm">
            <div
              className={`relative`}
              style={styleMaxHeight as React.CSSProperties}
            >
              <ScrollArea className="w-full overflow-x-auto">
                <Table style={{ tableLayout: "fixed", minWidth: "100%" }}>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className="hover:bg-transparent"
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              style={{ width: header.getSize() }}
                              className="bg-muted/50 font-semibold text-muted-foreground first:rounded-tl-lg last:rounded-tr-lg h-11"
                            >
                              {header.isPlaceholder ? null : (
                                <div
                                  className={cn(
                                    "flex items-center gap-2",
                                    header.column.getCanSort() &&
                                      "cursor-pointer select-none hover:text-foreground"
                                  )}
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {header.column.getCanSort() && (
                                    <span className="ml-auto">
                                      {getSortingIcon(
                                        header.column.getIsSorted()
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                </Table>
                <ScrollArea
                  className={`w-full h-auto`}
                  style={styleMaxHeightScroll as React.CSSProperties}
                >
                  <Table>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="hover:bg-muted/50"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                style={{ width: cell.column.getSize() }}
                                className="py-1"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center text-muted-foreground"
                          >
                            No hay resultados.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
          {pagination && table.getPageCount() > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent className="bg-white border rounded-lg shadow-sm dark:bg-black">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => table.previousPage()}
                      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        !table.getCanPreviousPage()
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      title="Anterior"
                    />
                  </PaginationItem>

                  <div className="hidden sm:flex">
                    {Array.from(
                      { length: table.getPageCount() },
                      (_, index) => index + 1
                    ).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => table.setPageIndex(page - 1)}
                          isActive={
                            table.getState().pagination.pageIndex === page - 1
                          }
                          className={cn(
                            "transition-colors cursor-pointer",
                            table.getState().pagination.pageIndex === page - 1
                              ? "bg-muted hover:bg-muted dark:bg-muted-dark dark:hover:bg-muted-dark"
                              : "hover:bg-muted/50 dark:hover:bg-muted-dark/50"
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </div>

                  <div className="flex sm:hidden items-center justify-center">
                    <span className="text-muted-foreground">
                      <span className="hidden md:inline">Página </span>
                      {table.getState().pagination.pageIndex + 1} de{" "}
                      {table.getPageCount()}
                    </span>
                  </div>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => table.nextPage()}
                      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        !table.getCanNextPage()
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          <div className="text-center mt-2 text-muted-foreground text-sm">
            Se encontraron {table.getFilteredRowModel().rows.length} resultados
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;
