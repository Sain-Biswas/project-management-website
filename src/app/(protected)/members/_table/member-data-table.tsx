"use client";

import DataTablePagination from "@/components/table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import memberListStylePreferenceAtom from "@/hooks/jotai/member-list-style-preference";
import { apiClient } from "@/trpc/react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState
} from "@tanstack/react-table";
import { useAtom } from "jotai";
import { useState } from "react";
import MembersDataTableToolbar from "./member-data-table-toolbar";
import MemberGridCard from "./member-grid-card";
import { memberColumns } from "./members-column";

export default function MembersDataTable({
  organizationId
}: {
  organizationId: string;
}) {
  "use no memo";

  const [membersList] =
    apiClient.organization.getAllMemberList.useSuspenseQuery({
      organizationId
    });

  const [style] = useAtom(memberListStylePreferenceAtom);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: membersList,
    columns: memberColumns,
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return (
    <div className="space-y-6">
      <MembersDataTableToolbar table={table} />
      {style === "grid" && (
        <div className="">
          {!!table.getRowModel().rows.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2">
              {table.getRowModel().rows.map((member) => (
                <MemberGridCard
                  member={member.original}
                  row={member}
                  key={member.original.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-24 items-center justify-center">
              <p>No Projects</p>
            </div>
          )}
        </div>
      )}
      {style === "list" && (
        <div className="w-full overflow-hidden rounded-md border">
          <Table className="w-full">
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    colSpan={memberColumns.length}
                    className="h-24 text-center"
                  >
                    No members found for your organization. Try adjusting
                    filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <DataTablePagination table={table} />
    </div>
  );
}
