"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconUsers,
  IconUsersPlus
} from "@tabler/icons-react";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconDashboard
  },
  {
    title: "Analytics",
    url: "#",
    icon: IconChartBar
  },
  {
    title: "Projects",
    url: "#",
    icon: IconFolder
  },
  {
    title: "Members",
    url: "#",
    icon: IconUsers
  },
  {
    title: "Invitations",
    url: "#",
    icon: IconUsersPlus
  }
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
