"use client";

import DataTableColumnHeader from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import organizationMemberRoleMap from "@/constants/organization-member-role.map";
import { type RouterOutputs } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import MemberDataTableRowAction from "./member-data-table-row-action";

export type TMembersList = RouterOutputs["organization"]["getAllMemberList"][0];

export const memberColumns: ColumnDef<TMembersList>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="select-all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member Details" />
    ),
    cell: ({ row }) => {
      const user = row.original.users;

      return (
        <div className="ml-2 flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((i) => i.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const roleData = organizationMemberRoleMap.find(
        (i) => i.slug === row.original.role
      )!;

      return (
        <div className="flex items-center gap-2">
          <roleData.icon className="size-5" />
          <p className="text-base">{roleData.name}</p>
        </div>
      );
    },
    enableSorting: false
  },
  {
    accessorKey: "joinedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joining Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.joinedOn!;
      return <div className="ml-2">{format(date, "PPPP")}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <MemberDataTableRowAction row={row} />
  }
];
