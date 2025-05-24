"use client";

import { IconCirclePlusFilled } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

export default function NewInvitationsDialog() {
  return (
    <Dialog>
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
      </DialogContent>
    </Dialog>
  );
}
