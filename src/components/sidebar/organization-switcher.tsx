"use client";

import {
  IconCirclePlusFilled,
  IconInnerShadowBottom,
  IconInnerShadowTop,
  IconSwitchHorizontal
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={undefined} alt="" />
                <AvatarFallback>
                  <IconInnerShadowTop className="!size-5" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Acme Inc.</span>
                <span className="text-muted-foreground truncate text-xs">
                  Organization
                </span>
              </div>
              <IconSwitchHorizontal className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-90 min-w-52 rounded-lg"
            side={isMobile ? "top" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Avatar className="size-4 rounded-lg">
                  <AvatarImage src={undefined} alt="" />
                  <AvatarFallback>
                    <IconInnerShadowBottom />
                  </AvatarFallback>
                </Avatar>
                AAcme Inc.
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
          </DropdownMenuContent>
        </DropdownMenu>
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
