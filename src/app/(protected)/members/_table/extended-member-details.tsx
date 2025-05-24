"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import memberListStylePreferenceAtom from "@/hooks/jotai/member-list-style-preference";
import { cn } from "@/lib/utils";
import { IconEye } from "@tabler/icons-react";
import { useAtom } from "jotai";

export default function ExtendedMemberDetails({ userId }: { userId: string }) {
  const [style] = useAtom(memberListStylePreferenceAtom);
  const isGrid = style === "grid";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="h-8">
          <IconEye />
          <span className={cn(!!!isGrid && "hidden lg:inline")}>View more</span>
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
