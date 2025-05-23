"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { apiClient } from "@/trpc/react";
import { IconDots } from "@tabler/icons-react";
import type { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import type { TMembersList } from "./members-column";

interface MemberDataTableRowActionsProps {
  row: Row<TMembersList>;
}

export default function MemberDataTableRowAction({
  row
}: MemberDataTableRowActionsProps) {
  const data = row.original;
  const [role] = apiClient.organization.getMemberRole.useSuspenseQuery();
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();

  const utility = apiClient.useUtils();

  const changeRoleMutation =
    apiClient.organization.changeMemberRole.useMutation({
      onSuccess: async (_data, variables) => {
        toast.success("Changed role successfully", {
          description: `${data.users.name} shifted to ${variables.role}`
        });
        await utility.invalidate();
      },
      onError(error) {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error("You are not entitled for this action.", {
            description: error.message
          });
        } else {
          toast.error("Failed to update role.", {
            description: "Try after sometime"
          });
        }
      }
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <IconDots className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {role === "owner" && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {data.role === "admin" && (
                <DropdownMenuItem
                  onClick={() =>
                    changeRoleMutation.mutate({
                      memberId: data.users.id,
                      organizationId: activeOrganization?.id ?? "",
                      role: "member"
                    })
                  }
                >
                  Member
                </DropdownMenuItem>
              )}
              {data.role === "member" && (
                <DropdownMenuItem
                  onClick={() =>
                    changeRoleMutation.mutate({
                      memberId: data.users.id,
                      organizationId: activeOrganization?.id ?? "",
                      role: "admin"
                    })
                  }
                >
                  Admin
                </DropdownMenuItem>
              )}
              {data.role === "owner" && (
                <DropdownMenuItem>
                  Owner can&apos;t change his role.
                </DropdownMenuItem>
              )}
              {data.role === "removed" && (
                <DropdownMenuItem>
                  No longer a member of the organization.
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
