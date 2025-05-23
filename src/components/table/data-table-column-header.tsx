import { cn } from "@/lib/utils";
import {
  IconArrowDownCircleFilled,
  IconArrowsHorizontal,
  IconArrowUpCircleFilled,
  IconEyeOff
} from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";
import type { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  canSort: boolean;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  canSort,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!!!column.getCanSort() || canSort) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent h-8"
          >
            {title}
            {column.getIsSorted() === "asc" ? (
              <IconArrowUpCircleFilled />
            ) : column.getIsSorted() === "desc" ? (
              <IconArrowDownCircleFilled />
            ) : (
              <IconArrowsHorizontal />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <IconArrowUpCircleFilled /> ASC
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <IconArrowDownCircleFilled /> DESC
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <IconEyeOff /> Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
