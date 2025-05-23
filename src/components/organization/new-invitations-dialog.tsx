"use client";

import { IconCirclePlusFilled } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

export default function NewInvitationsDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"default"} size={"sm"} className="h-8">
          <IconCirclePlusFilled />
          Send Invitation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send invitation to others for join</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
