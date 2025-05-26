"use client";

import { apiClient } from "@/trpc/react";
import { IconExclamationCircleFilled } from "@tabler/icons-react";

export default function InvitationsPage() {
  const [activeOrganization] =
    apiClient.organization.activeOrganization.useSuspenseQuery();

  if (!!!activeOrganization) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <IconExclamationCircleFilled className="size-12 md:size-18 lg:size-24" />
        <h1 className="text-2xl font-bold md:text-4xl">
          No active organization
        </h1>
        <p className="md:text-lg">Create or join a organization to continue.</p>
        <p className="md:text-lg">
          If you are part of a organization switch to it from organization
          switcher from the top of the sidebar.
        </p>
      </main>
    );
  }

  return <main className="flex flex-1 flex-col"></main>;
}
