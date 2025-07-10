"use client";

import DataTableColumnHeader from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import organizationCategoryMap from "@/constants/organization-category.map";
import organizationMemberRoleMap from "@/constants/organization-member-role.map";
import type { RouterOutputs } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";

export type TReceivedInvitations =
  RouterOutputs["organization"]["getInvitationsReceived"][0];

const invitationsReceivedColumns: ColumnDef<TReceivedInvitations>[] = [
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
    accessorKey: "organizationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => {
      const organization = row.original.organization;

      const category = organizationCategoryMap.find(
        (i) => i.slug === organization.category
      );

      return (
        <div className="ml-2 flex items-center gap-2">
          <Avatar>
            <AvatarImage src={organization.image ?? undefined} />
            <AvatarFallback>
              {organization.name
                .split(" ")
                .map((i) => i.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold lg:text-base">
              {organization.name}
            </p>
            {category ? (
              <div className="flex items-center gap-2">
                <category.icon className="size-4" />
                <p className="text-xs">{category.name}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "invitedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invited By" />
    ),
    cell: ({ row }) => {
      const invitedBy = row.original.invitedBy;

      return (
        <div className="ml-2 flex items-center gap-2">
          <Avatar>
            <AvatarImage src={invitedBy.image ?? undefined} />
            <AvatarFallback>
              {invitedBy.name
                .split(" ")
                .map((i) => i.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-bold lg:text-lg">{invitedBy.name}</p>
            <p className="text-xs">{invitedBy.email}</p>
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
      const role = organizationMemberRoleMap.find(
        (i) => i.slug === row.original.role
      )!;

      return (
        <div className="flex items-center gap-2">
          <role.icon className="size-5" />
          <p>{role.name}</p>
        </div>
      );
    }
  }
];

export default invitationsReceivedColumns;
