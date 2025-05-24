"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { IconEye } from "@tabler/icons-react";

export default function ExtendedMemberDetails({ userId }: { userId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="h-8">
          <IconEye />
          <span className="hidden lg:inline">View more</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{userId}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
