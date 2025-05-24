"use client";

import memberListStylePreferenceAtom from "@/hooks/jotai/member-list-style-preference";
import { cn } from "@/lib/utils";
import { IconListCheck } from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export default function DataTableViewOptions<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  "use no memo";

  const [style] = useAtom(memberListStylePreferenceAtom);
  const isHidden = style === "grid";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          size={"sm"}
          className={cn("ml-auto hidden h-8 lg:flex", isHidden && "lg:hidden")}
        >
          <IconListCheck />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select columns to view</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
