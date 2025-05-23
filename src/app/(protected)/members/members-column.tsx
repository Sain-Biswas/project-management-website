import DataTableColumnHeader from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { RouterOutputs } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";

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
      <DataTableColumnHeader
        canSort={false}
        column={column}
        title="Member Details"
      />
    ),
    cell: ({ row }) => {
      const user = row.original.users;

      return (
        <div className="ml-3 flex items-center gap-2">
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
  }
];
