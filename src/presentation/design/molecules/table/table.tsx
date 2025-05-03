import SkeletonTable from "@design/atoms/skeleton/skeleton-table";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useMediaQuery } from "@uidotdev/usehooks";
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
export default function Table({
  data,
  columns,
  isLoading = false,
  onChangePage,
  totalPages = 0,
  hasPagination = false,
  page = 0,
}: TableProps) {
  const { t } = useTranslation("common");
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  useEffect(() => {
    onChangePage && onChangePage(pagination.pageIndex);
  }, [pagination.pageIndex, onChangePage]);
  return (
    <>
      <div className="col-span-12 flex items-start justify-start w-full">
        <div className="overflow-hidden hover:overflow-x-auto w-full h-full">
          <table className="table bg-base-100 ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
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
                          {{
                            asc: <FaCaretUp />,
                            desc: <FaCaretDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="w-full"
                  >
                    <SkeletonTable />
                  </td>
                </tr>
              )}
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover cursor-pointer md:cursor-auto"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      </div>
      {hasPagination && (
        <div className="flex justify-center md:justify-start">
          <Pagination
            currentPage={pagination.pageIndex}
            totalPages={totalPages}
            onPageChange={(page) => table.setPageIndex(page)}
            layout={isSmallDevice ? "table" : "pagination"}
            previousLabel={t("button.previous", { ns: "common"  })}
            nextLabel={t("button.next", { ns: "common" })}
          />
        </div>
      )}
    </>
  );
}
