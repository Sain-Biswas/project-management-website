"use client";

import organizationMemberRoleMap from "@/constants/organization-member-role.map";
import { apiClient } from "@/trpc/react";
import {
  organizationMemberAddingValidator,
  type TOrganizationMemberAddingValidator
} from "@/validator/organization.validator";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  IconCircleArrowUpRightFilled,
  IconCirclePlusFilled
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

export default function NewInvitationsDialog() {
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();
  const [currentMemberRole] =
    apiClient.organization.getMemberRole.useSuspenseQuery();

  const [open, setOpen] = useState<boolean>(false);

  const newInvitationForm = useForm<TOrganizationMemberAddingValidator>({
    resolver: standardSchemaResolver(organizationMemberAddingValidator),
    defaultValues: {
      organizationId: activeOrganization?.id,
      role: "member",
      userEmail: ""
    }
  });

  const adminRole = organizationMemberRoleMap.find((i) => i.slug === "admin")!;
  const memberRole = organizationMemberRoleMap.find(
    (i) => i.slug === "member"
  )!;

  const sendInvitationMutation =
    apiClient.organization.inviteUserToOrganization.useMutation({
      onSuccess: (data) => {
        toast.success("Invitation sent successfully", {
          description: `${data} can access invitation from invitations page.`
        });
        newInvitationForm.reset();
        setOpen(false);
      },
      onError: (error) => {
        toast.error("Failed to send invitation", {
          description: error.shape?.message
        });
      }
    });

  function onSubmit(values: TOrganizationMemberAddingValidator) {
    sendInvitationMutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} size={"sm"} className="h-8">
          <IconCirclePlusFilled />
          Send Invitation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send invitation to others for joining</DialogTitle>
          <DialogDescription>
            Please fill in the details to continue.
          </DialogDescription>
        </DialogHeader>
        <Form {...newInvitationForm}>
          <form
            onSubmit={newInvitationForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={newInvitationForm.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter email of user to invite</FormLabel>
                  <FormControl>
                    <Input placeholder="goodperson@axion.app" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newInvitationForm.control}
              name="role"
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
                      {currentMemberRole === "owner" && (
                        <SelectItem value={adminRole.slug}>
                          <div className="flex gap-2">
                            <adminRole.icon />
                            <span>{adminRole.name}</span>
                          </div>
                        </SelectItem>
                      )}
                      <SelectItem value={memberRole.slug}>
                        <div className="flex gap-2">
                          <memberRole.icon />
                          <span>{memberRole.name}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                variant={"default"}
                size={"sm"}
                className="h-8"
                disabled={sendInvitationMutation.isPending}
              >
                {sendInvitationMutation.isPending && (
                  <div className="size-3 animate-spin rounded-full border-t-2 text-transparent">
                    .
                  </div>
                )}
                <span>Send Invitation</span>
                <IconCircleArrowUpRightFilled className="size-5" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
