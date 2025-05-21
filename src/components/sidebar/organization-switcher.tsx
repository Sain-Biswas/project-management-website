"use client";

import { apiClient } from "@/trpc/react";
import {
  IconCirclePlusFilled,
  IconExclamationCircleFilled,
  IconInnerShadowBottom,
  IconInnerShadowTop,
  IconSwitchHorizontal
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSubItem,
  useSidebar
} from "../ui/sidebar";

export function OrganizationSwitcher() {
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();
  const [allOrganization] =
    apiClient.organization.getOrganizationList.useSuspenseQuery();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {activeOrganization ? (
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src={activeOrganization.image ?? undefined}
                      alt=""
                    />
                    <AvatarFallback>
                      <IconInnerShadowTop className="!size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeOrganization.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {activeOrganization.category}
                    </span>
                  </div>
                  <IconSwitchHorizontal className="ml-auto size-4" />
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={undefined} alt="" />
                    <AvatarFallback>
                      <IconExclamationCircleFilled className="!size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      No Active Organization
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      Please create or select one.
                    </span>
                  </div>
                  <IconSwitchHorizontal className="ml-auto size-4" />
                </SidebarMenuButton>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-w-90 min-w-52 rounded-lg"
              side={isMobile ? "top" : "right"}
              align="start"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                {allOrganization.length ? (
                  allOrganization.map((organization) => (
                    <DropdownMenuItem key={organization.id}>
                      <Avatar className="size-4 rounded-lg">
                        <AvatarImage
                          src={organization.image ?? undefined}
                          alt=""
                        />
                        <AvatarFallback>
                          <IconInnerShadowBottom />
                        </AvatarFallback>
                      </Avatar>
                      {organization.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem>
                    No organizations create one to continue.
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new organization.</DialogTitle>
              <DialogDescription>
                Add the needed details to continue.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function SuspendedOrganizationSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuSubItem>
        <SidebarMenuSkeleton showIcon className="h-12 w-full" />
      </SidebarMenuSubItem>
    </SidebarMenu>
  );
}
