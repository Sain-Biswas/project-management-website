"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import organizationMemberRoleMap from "@/constants/organization-member-role.map";
import type { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import ExtendedMemberDetails from "./extended-member-details";
import MemberDataTableRowAction from "./member-data-table-row-action";
import type { TMembersList } from "./members-column";

interface MemberGridCardProps {
  member: TMembersList;
  row: Row<TMembersList>;
}

export default function MemberGridCard({ member, row }: MemberGridCardProps) {
  const roleMap = organizationMemberRoleMap.find(
    (i) => i.slug === member.role
  )!;

  return (
    <Card className="max-w-full">
      <CardHeader className="flow-row flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            aria-label="Select Row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
          <Avatar className="bg-background">
            <AvatarImage src={member.users.image ?? undefined} />
            <AvatarFallback className="bg-background">
              {member.users.name
                .split(" ")
                .map((i) => i.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-wrap">{member.users.name}</CardTitle>
            <CardDescription className="text-wrap">
              {member.users.email}
            </CardDescription>
          </div>
        </div>
        <MemberDataTableRowAction row={row} />
      </CardHeader>

      <CardContent>
        <p className="text-xs text-wrap lg:text-base">
          Joined on:{" "}
          <span className="text-sm font-bold text-wrap lg:text-lg">
            {format(member.joinedOn, "PPPP")}
          </span>
        </p>
      </CardContent>

      <CardFooter className="justify-between">
        <div className="flex items-center gap-3">
          <roleMap.icon className="size-5" />
          <span className="font-bold">{roleMap.name}</span>
        </div>
        <ExtendedMemberDetails userId={member.users.id} />
      </CardFooter>
    </Card>
  );
}
