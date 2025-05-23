"use client";

import organizationCategoryMap from "@/constants/organization-category.map";
import { apiClient } from "@/trpc/react";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import MembersDataTable from "./_table/member-data-table";

export default function MembersPage() {
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

  const activeOrganizationCategory = organizationCategoryMap.find(
    (i) => i.slug === activeOrganization?.category
  )!;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <section id="active-organization">
        <div className="flex items-center justify-between">
          <p className="md:text-lg">Organization</p>
          <div className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            <activeOrganizationCategory.icon className="size-5" />
            <span>{activeOrganizationCategory.name}</span>
          </div>
        </div>
        <h1 className="line-clamp-1 text-4xl font-extrabold md:text-5xl">
          {activeOrganization?.name}
        </h1>
      </section>
      <section id="members-table" className="space-y-6">
        <h1 className="text-xl font-bold md:text-2xl">
          Organization members list
        </h1>
        <MembersDataTable organizationId={activeOrganization.id} />
      </section>
    </main>
  );
}
