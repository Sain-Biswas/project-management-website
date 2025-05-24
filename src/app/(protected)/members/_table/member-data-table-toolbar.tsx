"use client";

import NewInvitationsDialog from "@/components/organization/new-invitations-dialog";
import DataTableFacetedFilter from "@/components/table/data-table-faceted-filter";
import DataTableViewOptions from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import organizationMemberRoleMap from "@/constants/organization-member-role.map";
import memberListStylePreferenceAtom from "@/hooks/jotai/member-list-style-preference";
import {
  IconLayoutGridFilled,
  IconList,
  IconXboxXFilled
} from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";
import { useAtom } from "jotai";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function MembersDataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [style, setStyle] = useAtom(memberListStylePreferenceAtom);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("users")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("users")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          column={table.getColumn("role")}
          options={organizationMemberRoleMap}
          title="Roles"
        />
        {isFiltered && (
          <Button
            variant="secondary"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <IconXboxXFilled />
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <div className="bg-secondary h-8 rounded-lg p-1">
          <Button
            size={"sm"}
            variant={style === "list" ? "destructive" : "ghost"}
            onClick={() => setStyle("list")}
            className="h-6"
          >
            <IconList />
          </Button>
          <Button
            size={"sm"}
            variant={style !== "list" ? "destructive" : "ghost"}
            onClick={() => setStyle("grid")}
            className="h-6"
          >
            <IconLayoutGridFilled />
          </Button>
        </div>
        <NewInvitationsDialog />
      </div>
    </div>
  );
}
