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
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: IconChartBar
  },
  {
    title: "Projects",
    url: "/projects",
    icon: IconFolder
  },
  {
    title: "Members",
    url: "/members",
    icon: IconUsers
  },
  {
    title: "Invitations",
    url: "/invitations",
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
              <Link href={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
