"use client";

import organizationCategoryMap from "@/constants/organization-category.map";
import { apiClient } from "@/trpc/react";
import { organizationInsetValidator } from "@/validator/organization.validator";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { SelectValue } from "@radix-ui/react-select";
import {
  IconCirclePlusFilled,
  IconExclamationCircleFilled,
  IconInnerShadowBottom,
  IconInnerShadowTop,
  IconSwitchHorizontal
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod/v4";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSubItem,
  useSidebar
} from "../ui/sidebar";
import { Textarea } from "../ui/textarea";

export function OrganizationSwitcher() {
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();
  const [allOrganization] =
    apiClient.organization.getOrganizationList.useSuspenseQuery();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { isMobile } = useSidebar();

  const newOrganizationForm = useForm<
    z.infer<typeof organizationInsetValidator>
  >({
    resolver: standardSchemaResolver(organizationInsetValidator),
    defaultValues: {
      category: "free",
      description: "",
      image: "",
      name: ""
    }
  });

  const utility = apiClient.useUtils();

  const newOrganizationMutation =
    apiClient.organization.newOrganization.useMutation({
      async onSuccess() {
        toast.success("New organization created.", {
          description: "You can now switch to it from sidebar."
        });
        newOrganizationForm.reset();
        await utility.invalidate();
        setOpenDialog(false);
      },
      onError() {
        toast.error("Failed to create a organization.", {
          description: "Please try again after some time."
        });
      }
    });

  async function onSubmit(values: z.infer<typeof organizationInsetValidator>) {
    await newOrganizationMutation.mutateAsync(values);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
              <DialogTitle>Create a new organization</DialogTitle>
              <DialogDescription>
                Add the needed details to continue.
              </DialogDescription>
            </DialogHeader>
            <Form {...newOrganizationForm}>
              <form
                onSubmit={newOrganizationForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={newOrganizationForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newOrganizationForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Something about your organization."
                          aria-multiline
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newOrganizationForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select a category for your organization."
                              className=""
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {organizationCategoryMap.map((item) => (
                            <SelectItem key={item.title} value={item.title}>
                              <div className="flex gap-2">
                                <item.icon />
                                <span>{item.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    <IconCirclePlusFilled />
                    <span>Crate new organization</span>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
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
