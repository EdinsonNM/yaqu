import SkeletonTable from "@design/atoms/skeleton/skeleton-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import {  Table } from "flowbite-react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export type TableProps = {
  data: any[];
  columns: any[];
  isLoading?: boolean;
  onChangePage?: (page: number) => void;
  totalPages?: number;
  hasPagination?: boolean;
  page?: number;
};
export default function SingleTable({
    data,
    columns,
    isLoading = false,
  }: TableProps) {
    useTranslation("common");
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  if(data.length === 0) return null;
    return (
      <>
        <div className="col-span-12 flex items-start justify-start w-full">
          <div className="w-full h-full overflow-auto max-h-[300px]">
            <Table hoverable>
              <Table.Head>
                {table.getHeaderGroups().map((headerGroup) => (
                  headerGroup.headers.map((header) => (
                    <Table.HeadCell key={header.id}>
                      {header.isPlaceholder ? null : (
                        <span
                          className={classNames("flex flex-row gap-2", {
                            "cursor-pointer select-none":
                              header.column.getCanSort(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {({
                            asc: <FaCaretUp />,
                            desc: <FaCaretDown />,
                          }[header.column.getIsSorted() as string] ?? null)}
                        </span>
                      )}
                    </Table.HeadCell>
                  ))
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {isLoading && (
                  <Table.Row>
                    <Table.Cell
                      colSpan={table.getVisibleFlatColumns().length}
                    >
                      <SkeletonTable />
                    </Table.Cell>
                  </Table.Row>
                )}
                {table.getRowModel().rows.map((row) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        key={cell.id}
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </>
    );
  }
  